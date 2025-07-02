/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
    output: 'export', // Enables static HTML export
  images: {
    unoptimized: true, 
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
