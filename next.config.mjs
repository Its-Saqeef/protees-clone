/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : true,
    serverExternalPackages: ["mongoose", "mongodb"],
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "res.cloudinary.com"
            },
            {
                protocol : "http",
                hostname : "res.cloudinary.com"
            },
        ]
    }
};

export default nextConfig;
