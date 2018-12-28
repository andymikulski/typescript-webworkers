// webpack.config.js
let webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/main.ts',
        networkedWorker: './src/NetworkedWorker.ts',
        threadedWorker: './src/ThreadedWorker.ts',
        particleWorker: './src/ParticleWorker.ts'
    },
    output: {
        filename: "dist/[name].js",
        library: "[name]",
        libraryTarget: "umd"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        modules: ["node_modules"]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "dist/common.js",
        }),
        new webpack.BannerPlugin({
            banner: `var window = self;importScripts("./common.js");`,
            raw: true,
            entryOnly: true,
            test: ["dist/threadedWorker.js", "dist/networkWorker.js", "dist/particleWorker.js"]
        })
    ],
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    }
};
