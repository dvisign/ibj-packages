import path from "path"
import { fileURLToPath } from "url"
import { terser } from "rollup-plugin-terser";
import nodePolyfills from "rollup-plugin-node-polyfills";
import sucrase from "@rollup/plugin-sucrase";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rollupConfig = [
  {
    input: "packages/_components/index.tsx",
    output: [
      {
        file: "dist/_components/index.js",
        format: "umd",
        name: "ibjComponents",
        sourcemap: process.env.NODE_ENV === "production" ? true : false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      {
        file: "dist/_components/index.esm.js",
        format: "es",
        sourcemap: process.env.NODE_ENV === "production" ? true : false,
      },
    ],
    plugins: [
      alias({
        entries: [
          { find: "@ibj/components", replacement: path.resolve(__dirname, "packages/_components/src") },
        ],
      }),
      nodeResolve({ browser: true }),
      external(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", exclude: "**/*.tsx" }),
      sucrase({
        exclude: ["node_modules/**"],
        transforms: ["typescript", "jsx"],
      }),
      nodePolyfills(),
      process.env.NODE_ENV === "production" && terser(),
    ],
    external: ["react", "react-dom"],
  }
];

export default rollupConfig;
