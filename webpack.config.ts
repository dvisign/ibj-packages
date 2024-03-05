const path = require("path")
const nodeExternals = require("webpack-node-externals")

// devServer 설정을 포함하기 위해 Configuration 타입을 확장합니다.
const config = {
  name: "@ibj",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: process.env.NODE_ENV === "production" ? "hidden-source-map" : "eval",
  entry: "./index.ts",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    // TypeScript 파일을 로드할 때의 경로 설정
    alias: {
      "@ibj": path.resolve(__dirname, "packages"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  externalsPresets: { node: true }, // node_modules를 외부로 분리
  externals: [nodeExternals()], // Node.js 내장 모듈을 외부로 분리
}

module.exports = config
