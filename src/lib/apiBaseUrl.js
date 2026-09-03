/**
 * Public site URL for emails / absolute links.
 * Prefer an explicit site URL; fall back to Vercel production URL.
 */
export function getSiteUrl() {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

  if (explicit) {
    try {
      const url = new URL(explicit.replace(/\/$/, ""));
      if (
        url.hostname === "www.portfoliosite.store" ||
        url.hostname === "portfoliosite.store"
      ) {
        // expired domain — ignore
      } else if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
        return url.origin;
      }
    } catch {
      // fall through
    }
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(
      /^https?:\/\//,
      ""
    )}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  }

  return "http://localhost:3000";
}

/** @deprecated Use getSiteUrl for public links. Kept for existing imports. */
export function getApiBaseUrl() {
  return getSiteUrl();
}
