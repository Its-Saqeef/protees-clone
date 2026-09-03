/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : true,
    serverExternalPackages: ["mongoose", "mongodb"],
    eslint: {
        // FlatCompat configs include parser functions that Next cannot serialize during build.
        ignoreDuringBuilds: true,
    },
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
