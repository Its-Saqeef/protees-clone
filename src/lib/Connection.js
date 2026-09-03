import dns from "node:dns";
import mongoose from "mongoose";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connection={}

export default async function connectDB() {
    if(connection.isConnected){
        console.log("Database Already Connected");
        return;       
    }

    try {
       const db = await mongoose.connect(process.env.MONGODB_URI, { family: 4 })
       connection.isConnected=db.connections[0].readyState
       console.log("Connected with host ",db.connection.host);
    } catch (error) {
        console.error("Error ",error)
        throw error
    }
}