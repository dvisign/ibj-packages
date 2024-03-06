import path from "path"
import { fileURLToPath } from "url"

// 현재 파일의 URL을 파일 경로로 변환
const __filename = fileURLToPath(import.meta.url)

// __filename에서 디렉토리 경로를 얻음
const __dirname = path.dirname(__filename)
import nodeExternals from "webpack-node-externals"

const config = {
  name: "@ibj",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: process.env.NODE_ENV === "production" ? "hidden-source-map" : "eval",
  entry: "./index.ts",
  target: "node",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    sourceMapFilename: "[name].map",
    publicPath: "/dist/",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        use: "file-loader",
        type: "javascript/auto",
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

export default config
