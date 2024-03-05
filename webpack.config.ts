import path from "path"
import webpack from "webpack"

const isDevelopment = process.env.NODE_ENV !== "production"

const config: webpack.Configuration = {
  name: "ibj-front-common",
  mode: isDevelopment ? "development" : "production",
  devtool: !isDevelopment ? "hidden-source-map" : "eval",
  entry: "./index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/dist/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // 웹팩이 처리할 파일 확장자를 지정합니다.
    alias: {
      // tsconfig.json에서 정의한 경로 별칭을 웹팩 경로 별칭으로 변환
      "@": path.resolve(__dirname, "packages/"),
      "@/apis": path.resolve(__dirname, "packages/_apis/"),
      "@/components": path.resolve(__dirname, "packages/_components/"),
      "@/hooks": path.resolve(__dirname, "packages/_hooks/"),
      "@/eslint-config": path.resolve(__dirname, "packages/_eslint-config/"),
      "@/msw-config": path.resolve(__dirname, "packages/_msw-config/"),
      "@/typescript-config": path.resolve(__dirname, "packages/_typescript-config/"),
    },
    fallback: {
      path: require.resolve("path-browserify"), // path 모듈을 폴리필
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: "react", // React는 외부 종속성으로 처리하여 번들 크기를 줄입니다.
    "react-dom": "react-dom",
  },
}

export default config
