const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清理build文件夹

module.exports = {
  mode: "production",
  entry: {
    react: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "dll"),
    filename: "[name].[contenthash].dll.js",
    library: "_[name]_dll",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, "dll/[name]-manifest.json"),
      name: "_[name]_dll",
    }),
  ],
};
