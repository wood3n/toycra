const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin"); //inline runtime chunk
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); //压缩JS代码
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩CSS代码
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin; //分析代码打包
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); //代码打包速度分析工具
const smp = new SpeedMeasurePlugin();
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清理build文件夹
const ManifestPlugin = require("webpack-manifest-plugin");
const PnpWebpackPlugin = require("pnp-webpack-plugin");

module.exports = function (env) {
  const isDevelopment = env.NODE_ENV === "development";
  const isProduction = env.NODE_ENV === "production";
  const webpackConfig = {
    mode: isProduction ? "production" : isDevelopment && "development",
    entry: "./src/index.js",
    output: {
      filename: isProduction
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/bundle.js",
      chunkFilename: isProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : "static/js/[name].chunk.js",
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
      minimize: isProduction,
      minimizer: [
        new TerserPlugin(),
        new OptimizeCssAssetsPlugin({
          //压缩CSS
          assetNameRegExp: /\.css$/g,
          cssProcessor: require("cssnano"),
          cssProcessorPluginOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
          canPrint: true,
        }),
      ],
      moduleIds: false,
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      modules: [
        path.resolve(__dirname, "./src/components"),
        path.resolve("./node_modules"),
      ],
      extensions: [".wasm", ".mjs", ".js", ".json", "jsx"],
      plugins: [PnpWebpackPlugin],
      symlinks: false,
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    module: {
      rules: [
        {
          test: /\.m?jsx?$/,
          exclude: /(node_modules)/,
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
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties",
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
            cacheDirectory: true,
          },
          resolve: { extensions: [".js", ".jsx"] }, //自动解析index.jsx文件，必须加上这一句，且".js"不能省略
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
            "cache-loader",
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
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        cdn: {
          script: [
            isDevelopment
              ? "https://cdn.jsdelivr.net/npm/react@16.12.0/umd/react.development.js"
              : "https://cdn.jsdelivr.net/npm/react@16.12.0/umd/react.production.min.js",
            isDevelopment
              ? "https://cdn.jsdelivr.net/npm/react-dom@16.12.0/umd/react-dom.development.js"
              : "https://cdn.jsdelivr.net/npm/react-dom@16.12.0/umd/react-dom.production.min.js",
          ],
        },
      }),
      isProduction && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),
      isProduction && new CleanWebpackPlugin(),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
      isProduction &&
        new BundleAnalyzerPlugin({
          //打包分析
          analyzerMode: "disabled",
          openAnalyzer: false,
          generateStatsFile: true,
          statsFilename: "stats.json",
        }),
      isProduction && new ManifestPlugin(),
    ].filter(Boolean),
    devServer: {
      open: "chrome",
      port: 9999,
      compress: true,
      writeToDisk: false,
      hot: true,
    },
  };

  return isProduction ? smp.wrap(webpackConfig) : webpackConfig;
};
