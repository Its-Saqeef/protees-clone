import { Resolver } from "node:dns/promises";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

/**
 * Local Windows DNS often cannot resolve MongoDB Atlas SRV records.
 * Resolve them with public DNS and rebuild a standard mongodb:// URI.
 * On Vercel, the platform DNS works — use the original URI.
 */
async function resolveConnectionUri(uri) {
  if (process.env.VERCEL || !uri.startsWith("mongodb+srv://")) {
    return uri;
  }

  const parsed = new URL(uri.replace("mongodb+srv://", "https://"));
  const hostname = parsed.hostname;
  const username = decodeURIComponent(parsed.username);
  const password = decodeURIComponent(parsed.password);
  const dbName = parsed.pathname.replace(/^\//, "") || "test";

  const resolver = new Resolver();
  resolver.setServers(["8.8.8.8", "1.1.1.1"]);

  const [srvRecords, txtRecords] = await Promise.all([
    resolver.resolveSrv(`_mongodb._tcp.${hostname}`),
    resolver.resolveTxt(hostname).catch(() => []),
  ]);

  if (!srvRecords?.length) {
    throw new Error(`No SRV records found for ${hostname}`);
  }

  const hosts = srvRecords
    .map((record) => `${record.name}:${record.port}`)
    .join(",");

  const params = new URLSearchParams();
  for (const entry of txtRecords.flat()) {
    for (const part of String(entry).split("&")) {
      const [key, value] = part.split("=");
      if (key && value) params.set(key, value);
    }
  }

  for (const [key, value] of parsed.searchParams.entries()) {
    params.set(key, value);
  }

  if (!params.has("ssl")) params.set("ssl", "true");
  if (!params.has("authSource")) params.set("authSource", "admin");
  if (!params.has("retryWrites")) params.set("retryWrites", "true");
  if (!params.has("w")) params.set("w", "majority");

  return `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(
    password
  )}@${hosts}/${dbName}?${params.toString()}`;
}

/**
 * Cached connection for Next.js serverless / hot reload.
 * Reuses the same mongoose connection across invocations.
 */
const globalForMongoose = globalThis;

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = { conn: null, promise: null };
}

const cached = globalForMongoose.mongooseCache;

export default async function connectDB() {
  if (cached.conn?.connection?.readyState === 1) {
    return cached.conn;
  }

  cached.conn = null;

  if (!cached.promise) {
    cached.promise = (async () => {
      const uri = await resolveConnectionUri(MONGODB_URI);
      const options = {
        bufferCommands: false,
        serverSelectionTimeoutMS: 15000,
      };

      if (!process.env.VERCEL) {
        options.family = 4;
      }

      const mongooseInstance = await mongoose.connect(uri, options);
      console.log("Connected with host", mongooseInstance.connection.host);
      return mongooseInstance;
    })().catch((error) => {
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection error:", error.message);
    throw error;
  }

  return cached.conn;
}
