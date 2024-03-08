import path from "path"
import { fileURLToPath } from "url"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    typescript({ tsconfig: "./packages/eslint-config/tsconfig.json", outDir: "dist/eslint-config" }),
    copy({
      targets: [
        {
          src: "packages/eslint-config/library.json",
          dest: "dist/eslint-config",
        },
        {
          src: "packages/eslint-config/next.json",
          dest: "dist/eslint-config",
        },
      ],
    }),
    process.env.NODE_ENV === "production" && terser(),
  ],
  external: ["path"],
}

export default rollupConfig
