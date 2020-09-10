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
