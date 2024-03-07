import path from "path"
import { fileURLToPath } from "url"
import { terser } from "rollup-plugin-terser";
import nodePolyfills from "rollup-plugin-node-polyfills";
import sucrase from "@rollup/plugin-sucrase";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rollupConfig = [
  {
    input: "packages/components/index.tsx",
    output: [
      {
        file: "dist/components/index.js",
        format: "umd",
        name: "ibjComponents",
        sourcemap: process.env.NODE_ENV === "production" ? true : false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      {
        file: "dist/components/index.esm.js",
        format: "es",
        sourcemap: process.env.NODE_ENV === "production" ? true : false,
      },
    ],
    plugins: [
      external(),
      commonjs(),
      typescript({ tsconfig: "./packages/components/tsconfig.json"}),
      sucrase({
        exclude: ["node_modules/**"],
        transforms: ["typescript", "jsx"],
      }),
      nodePolyfills(),
      process.env.NODE_ENV === "production" && terser(),
    ],
    external: ["react", "react-dom", "@mui/base", "clsx", "@emotion/styled"],
  }
];

export default rollupConfig;
