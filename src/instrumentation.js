export async function register() {
  // Must run before any MongoDB SRV lookup on local Windows DNS.
  if (process.env.NEXT_RUNTIME === "nodejs" && !process.env.VERCEL) {
    const dns = await import("node:dns");
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
}
