const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist/scripts"),
    filename: "main.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { modules: false }],
              "@babel/preset-typescript",
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname,"public/css"), 
          to: path.join(__dirname,"dist/css")
        },
        {
          from: path.join(__dirname,"public/index.html"), 
          to: path.join(__dirname,"dist/index.html")
        },
        {
          from: path.join(__dirname,"public/font"), 
          to: path.join(__dirname,"dist/font")
        }
      ]
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname,"dist")
    },
    compress: true, 
    port: 4000,
  }
};
