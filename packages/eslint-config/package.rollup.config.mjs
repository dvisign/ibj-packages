import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"

const rollupConfig = {
  input: "packages/eslint-config/index.ts", // 가정된 시작점
  output: {
    file: "dist/eslint-config/index.js",
    format: "cjs",
    sourcemap: process.env.NODE_ENV === "production",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: "./packages/eslint-config/tsconfig.json" }),
    process.env.NODE_ENV === "production" && terser(),
  ],
  external: ["path"],
}

export default rollupConfig