## toycra

### 2020-08-16

- install `webpack`和`webpack-cli`
- install `babel-loader`,`@babel/core`, `@babel/preset-env`和`@babel/preset-react`
- 配置 webpack 支持使用 React JSX 编写组件

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
```

- 配置 npm-scripts 执行`yarn build`命令打包

### 2020-08-31

- 配置 npm scripts 区分 webpack 的 mode
- 配置开发环境 WDS
- 配置 WDS 的 HMR
- install `@pmmmwh/react-refresh-webpack-plugin`和`react-refresh`，并配置 React Fast Refresh
- 配置生产环境开启 source map
- install `html-webpack-plugin`，配置 HTML 模板页面
- install `style-loader`，`css-loader`，`mini-css-extract-plugin`，`optimize-css-assets-webpack-plugin`，配置 webpack 支持 CSS 解析打包
- install `url-loader`，配置图片 Base64 内联，配置字体文件解析
- install `babel-plugin-inline-react-svg`，支持 JSX 组件形式引入 SVG

### 2020-09-08

- install `postcss-loader`，优化 CSS 代码
- install `@fullhuman/postcss-purgecss`，配置 plugin 支持移除无用的 CSS 代码
- 探索 webpack 的 code splitting 功能，在打包的时候将`node_modules`第三方库和`runtime`代码抽成单独的 chunk
- 探索 webpack 的 tree shaking 配置，指定`optimization.providedExports:true`，`optimization.usedExports:true`以及指定`package.json` 的 `sideEffects`属性
- install `clean-webpack-plugin`，在打包的时候先清除`build`目录文件

### 2020-09-10

- 配置 webpack 的`resolve`规则去简化`import`的路径解析规则
- install `pnp-webpack-plugin`，探索学习 Plug'n'Play 的设计思想
- 探索学习 webpack 的`optimization`配置项

### 2020-09-11

- 修改 webpack 抽取 chunk 的文件名配置，也就是指定`output.chunkFilename`和`mini-css-extract-plugin`的`chunkFilename`

```javascript
module.exports = {
  entry: {
    home: "./src/index.js",
    other: "./src/test.js",
  },
  output: {
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:8].chunk.js"
      : "static/js/[name].chunk.js",
  },
  plugins: [
    isProduction &&
      new MiniCssExtractPlugin({
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),
  ],
};
```

- 优化`babel-loader`配置，引入 `cacheDirectory:true`，引入 `@babel/plugin-transform-runtime` plugin

### 2020-09-12

- 修改 `webpack-bundle-analyzer`的配置项 `analyzerMode: "disabled"`，这样在打包完成以后就可以自动结束终端运行了
- install `cache-loader`，测试在一些耗时长的 loader 使用时的缓存效果，尤其是像压缩图片的 `image-webpack-loader`这样的 loader 前使用

### 2020-09-13

- 使用 `DllPlugin` 打包第三方库，目前尚未解决和 `SplitChunksPlugin`的冲突问题
