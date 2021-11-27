const path = require("path");

module.exports = {
    mode : "none",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use : {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
}