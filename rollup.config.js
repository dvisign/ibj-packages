import { terser } from "rollup-plugin-terser"
import nodePolyfills from "rollup-plugin-node-polyfills"
import sucrase from "@rollup/plugin-sucrase"
import typescript from "@rollup/plugin-typescript"
import external from "rollup-plugin-peer-deps-external"
import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import alias from "@rollup/plugin-alias"

export default [
  {
    input: ["src/components/index.tsx"],
    output: [
      {
        dir: "dist",
        format: "es",
        name: "ibjComponents",
        sourcemap: process.env.NODE_ENV === "production" ? true : false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    ],
    plugins: [
      nodeResolve({ browser: true }),
      external(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        outputToFilesystem: true,
        declaration: true,
        outDir: "dist",
      }),
      sucrase({
        exclude: ["node_modules/**"],
        transforms: ["typescript", "jsx"],
      }),
      alias({
        entries: [
          { find: "@/components/*", replacement: "src/components/*" }, // `@`를 `src/`로 매핑
        ],
      }),
      nodePolyfills(),
      process.env.NODE_ENV === "production" && terser(),
    ],
    external: ["react", "react-dom", "src/stories/**"],
  },
]
