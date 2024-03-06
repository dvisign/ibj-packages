import path from "path";
import { fileURLToPath } from "url";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import sucrase from "@rollup/plugin-sucrase";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import alias from "@rollup/plugin-alias";
import nodePolyfills from 'rollup-plugin-node-polyfills'; // 추가

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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
    alias({
      entries: [{ find: "@ibj", replacement: path.resolve(__dirname, "packages") }]
    }),
    nodePolyfills(), // 추가
  ],
  external: ["react", "react-dom"],
}
