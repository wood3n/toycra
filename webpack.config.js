const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function (env) {
  const isDevelopment = env.NODE_ENV === "development";
  const isProduction = env.NODE_ENV === "production";
  return {
    mode: isProduction ? "production" : isDevelopment && "development",
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    devtool: isProduction ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.m?jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                isDevelopment && require.resolve("react-refresh/babel"),
                // "inline-react-svg",
              ].filter(Boolean),
            },
          },
        },
        {
          oneOf: [
            {
              test: /\.css$/i,
              use: [
                isDevelopment && {
                  loader: "style-loader",
                },
                isProduction && {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: "../../",
                  },
                },
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      localIdentName: isDevelopment
                        ? "[path][name]__[local]"
                        : "[hash:base64]",
                    },
                  },
                },
              ].filter(Boolean),
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: "url-loader",
              options: {
                limit: 1024 * 1024,
                name: "static/images/[name].[hash:8].[ext]",
              },
            },
            // {
            //   test: /\.svg$/i,
            //   exclude: path.resolve(__dirname, "src/assets/icons"),
            //   use: [
            //     {
            //       loader: "url-loader",
            //       options: {
            //         generator: (content) =>
            //           svgToMiniDataURI(content.toString()),
            //       },
            //     },
            //   ],
            // },
            {
              test: /\.svg$/i,
              include: path.resolve(__dirname, "src/assets/icons"),
              use: "svg-sprite-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: "public/sprite.svg" }],
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
      ,
    ].filter(Boolean),
    devServer: {
      open: true,
      port: 9999,
      compress: true,
      writeToDisk: false,
      hot: true,
      contentBase: "public",
    },
  };
};
