import path from "path"
import { fileURLToPath } from "url"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import sucrase from "@rollup/plugin-sucrase"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"
import external from "rollup-plugin-peer-deps-external"
import alias from "@rollup/plugin-alias"
import nodePolyfills from "rollup-plugin-node-polyfills"
import rollupConfig from './packages/components/package.rollup.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ES 모듈용 설정
const esConfig = {
  input: "index.tsx",
  output: [
    {
      file: path.join(__dirname, "dist/index.js"),
      format: "umd",
      name: "IbjLibrary",
      sourcemap: process.env.NODE_ENV === "production" ? true : false,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    {
      file: path.join(__dirname, "dist/index.esm.js"),
      format: "es",
      sourcemap: process.env.NODE_ENV === "production" ? true : false,
    },
  ],
  plugins: [
    alias({
      entries: [
        { find: "@ibj", replacement: path.resolve(__dirname, "packages") },
        { find: "@ibj/components", replacement: path.resolve(__dirname, "packages/components/src") },
      ],
    }),
    nodeResolve({ browser: true }), // browser 옵션 추가
    external(),
    commonjs(),
    json(),
    typescript({ tsconfig: "./tsconfig.json", exclude: "**/*.tsx" }),
    sucrase({
      exclude: ["node_modules/**"],
      transforms: ["typescript", "jsx"],
    }),
    process.env.NODE_ENV === "production" && terser(),
    nodePolyfills(), // 추가
  ],
  external: ["react", "react-dom"],
}

// CommonJS 모듈용 설정
const cjsConfig = {
  input: "packages/eslint-config/index.ts", // 가정된 시작점
  output: {
    file: path.join(__dirname, "dist/cjs/index.js"),
    format: "cjs",
    sourcemap: process.env.NODE_ENV === "production",
  },
  plugins: [
    alias({
      entries: [{ find: "@ibj/eslint-config", replacement: path.resolve(__dirname, "packages/eslint-config") }],
    }),
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  external: ["path"],
}

// export default [esConfig, cjsConfig]
export default rollupConfig;
