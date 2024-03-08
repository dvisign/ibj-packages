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
  input: "packages/typescript-config/index.ts", // 가정된 시작점
  output: {
    dir: "dist/typescript-config",
    format: "umd",
    name: "typescriptConfig",
    sourcemap: process.env.NODE_ENV === "production",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: "./packages/typescript-config/tsconfig.json", outDir: "dist/typescript-config" }),
    copy({
      targets: [
        {
          src: "packages/typescript-config/base.json",
          dest: "dist/typescript-config",
        },
        {
          src: "packages/typescript-config/next-config.json",
          dest: "dist/typescript-config",
        },
        {
          src: "packages/typescript-config/react-library.json",
          dest: "dist/typescript-config",
        },
      ],
    }),
    process.env.NODE_ENV === "production" && terser(),
  ],
  external: ["path"],
}

export default rollupConfig
