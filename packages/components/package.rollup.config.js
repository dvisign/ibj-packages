import { terser } from "rollup-plugin-terser";
import nodePolyfills from "rollup-plugin-node-polyfills";
import sucrase from "@rollup/plugin-sucrase";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs"

const rollupConfig = [
  {
    input: ["packages/components/index.tsx"],
    output: [{
      // file: "dist/components/index.js",
      dir: "dist/components",
      format: "es",
      name: "ibjComponents",
      sourcemap: process.env.NODE_ENV === "production" ? true : false,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    }],
    plugins: [
      external(),
      commonjs(),
      typescript({ tsconfig: "./packages/components/tsconfig.json", outputToFilesystem: true }),
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
