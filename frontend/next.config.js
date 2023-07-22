/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    env: {
        BACKEND: process.env.BACKEND,
    }
}

module.exports = nextConfig
