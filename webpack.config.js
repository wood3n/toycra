const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin"); //inline runtime chunk
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const PurgeCSSPlugin = require("purgecss-webpack-plugin"); //移除没用的CSS
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩CSS代码
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin; //分析代码打包
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); //代码打包速度分析工具
const smp = new SpeedMeasurePlugin();
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清理build文件夹
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = function (env) {
  const isDevelopment = env.NODE_ENV === "development";
  const isProduction = env.NODE_ENV === "production";
  const webpackConfig = {
    mode: isProduction ? "production" : isDevelopment && "development",
    entry: "./src/index.js",
    output: {
      filename: isProduction
        ? "static/js/[name].[contenthash].js"
        : "static/js/bundle.js",
      path: path.resolve(__dirname, "build"),
      pathinfo: false,
    },
    optimization: {
      providedExports: isProduction,
      usedExports: isProduction,
      sideEffects: isProduction,
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    // devtool: isProduction ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.m?jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                  },
                ],
                ["@babel/preset-react"],
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                isDevelopment && require.resolve("react-refresh/babel"),
                // "inline-react-svg",
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            isDevelopment && {
              loader: "style-loader",
            },
            isProduction && {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
                publicPath: "../../",
              },
            },
            {
              loader: "css-loader",
              options: {
                esModule: true,
                modules: {
                  localIdentName: isDevelopment
                    ? "[path][name]__[local]"
                    : "[hash:base64]",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    "postcss-flexbugs-fixes",
                    "autoprefixer",
                    "postcss-preset-env",
                    [
                      "@fullhuman/postcss-purgecss",
                      {
                        content: [
                          path.join(__dirname, "./public/index.html"),
                          ...glob.sync(
                            `${path.join(__dirname, "src")}/**/*.jsx`,
                            {
                              nodir: true,
                            }
                          ),
                        ],
                      },
                    ],
                  ],
                },
              },
            },
          ].filter(Boolean),
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/i],
          include: path.resolve(__dirname, "src/assets/images"),
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10 * 1024, //10KB
                name: "static/images/[name].[contenthash:8].[ext]",
              },
            },
            {
              loader: "image-webpack-loader",
              options: {
                disable: isDevelopment, //开发环境下禁用压缩图片
              },
            },
          ],
        },
        {
          test: /\.svg$/i,
          include: path.resolve(__dirname, "src/assets/icons"),
          loader: "svg-sprite-loader",
        },
        {
          test: [/\.ttf/i, /\.woff/i, /\.woff2/i, /\.eot/i, /\.otf/i],
          include: path.resolve(__dirname, "src/assets/fonts"),
          loader: "url-loader",
          options: {
            limit: 10 * 1024, //10KB
            name: "static/fonts/[name].[contenthash:8].[ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
      }),
      isProduction &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash].css",
        }),
      ,
      isProduction &&
        new BundleAnalyzerPlugin({
          //打包分析
          openAnalyzer: false,
          generateStatsFile: true,
          statsFilename: "stats.json",
        }),
      isProduction &&
        new OptimizeCssAssetsPlugin({
          //压缩CSS
          assetNameRegExp: /\.css$/g,
          cssProcessor: require("cssnano"),
          cssProcessorPluginOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
          canPrint: true,
        }),
      isProduction && new CleanWebpackPlugin(),
      isProduction && new ManifestPlugin(),
    ].filter(Boolean),
    devServer: {
      open: "chrome",
      port: 9999,
      compress: true,
      writeToDisk: false,
      hot: true,
      // contentBase: "public",
    },
  };

  return isProduction ? smp.wrap(webpackConfig) : webpackConfig;
};
