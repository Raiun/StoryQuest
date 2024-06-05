/** @type {import('next').NextConfig} */
const nextConfig = {
    // Override the default webpack configuration
    webpack: (config) => {
        // See https://webpack.js.org/configuration/resolve/#resolvealias
        config.resolve.alias = {
            ...config.resolve.alias,
            "sharp$": false,
            "onnxruntime-node$": false,
        }
        config.module.rules.push({
            test: /speechToText\.js$/,
            use: { loader: 'worker-loader' },
          });
        return config;
    },
};

export default nextConfig;
