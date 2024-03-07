import path from "path"
import { fileURLToPath } from "url"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rollupConfig = {
  input: "packages/typescript-config/index.ts", // 가정된 시작점
  output: {
    file: "dist/typescriopt-config/index.js",
    format: "cjs",
    sourcemap: process.env.NODE_ENV === "production",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: "./packages/typescript-config/tsconfig.json"}),
    process.env.NODE_ENV === "production" && terser(),
  ],
  external: ["path"],
}

export default rollupConfig;
