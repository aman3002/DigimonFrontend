/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
    // output: 'export', // Commented out for local dev — re-enable for production static export
  images: {
    unoptimized: true, 
  },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://dg.solapur.deepgazetech.com/api/:path*',
            },
        ];
    },
    webpack(config, { isServer }) {
        if (!isServer) {
            config.optimization.minimizer = [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            ascii_only: true, // ✅ Prevents invalid Unicode characters
                        },
                    },
                }),
            ];
        }

        return config;
    },
};

export default nextConfig;
