const EXPIRED_HOSTS = new Set(["www.portfoliosite.store", "portfoliosite.store"]);

function hostnameOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

export function getApiBaseUrl() {
  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL.startsWith("http")
      ? process.env.VERCEL_URL.replace(/\/$/, "")
      : `https://${process.env.VERCEL_URL}`;
  }

  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  if (envUrl && !EXPIRED_HOSTS.has(hostnameOf(envUrl))) {
    return envUrl;
  }

  return "http://localhost:3000";
}
