/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
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
