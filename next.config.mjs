/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nxrbbyqqkcgzatoqyroo.supabase.co'
            }
        ]
    }
}

export default nextConfig;
