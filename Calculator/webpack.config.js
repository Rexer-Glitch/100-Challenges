const path = require("path");

module.exports = {
    mode : "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use : {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-typescript"]
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx",".ts", ".tsx"],
    }
}