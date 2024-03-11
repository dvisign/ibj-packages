// import rollupConfig from "./packages/components/package.rollup.config"
// import eslintConfig from "./packages/eslint-config/package.rollup.config"
// import tsConfig from "./packages/typescript-config/package.rollup.config"
// const buildConfig = [rollupConfig, eslintConfig, tsConfig].flat()

// export default buildConfig

import fs from "fs"
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
import { promisify } from "util"

const readdir = promisify(fs.readdir)
const directoryPath = path.join(process.cwd(), "packages")

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const defaultBuildConfig = {
  // ES 모듈용 설정
  esConfig: {
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
  },
  // CommonJS 모듈용 설정
  cjsConfig: {
    input: "packages/eslint-config/index.ts", // 가정된 시작점
    output: {
      file: path.join(__dirname, "dist/cjs/index.js"),
      format: "cjs",
      sourcemap: process.env.NODE_ENV === "production",
    },
    plugins: [nodeResolve(), commonjs(), json(), typescript({ tsconfig: "./tsconfig.json" })],
    external: ["path"],
  },
}

function defaultConfig(moduleType = ["es"], fileDir = "", tsx = false) {
  if (!fileDir || !moduleType) {
    return null
  }
  return moduleType.map(module => ({
    input: `packages/${fileDir}/index.${tsx ? "tsx" : "ts"}`,
    output: {
      dir: `dist/${fileDir}`,
      format: `${module}`,
      name: "fileDir",
      sourcemap: process.env.NODE_ENV === "production",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      json(),
      typescript({ tsconfig: `./packages/${fileDir}/tsconfig.json`, outDir: `dist/${fileDir}` }),
      process.env.NODE_ENV === "production" && terser(),
    ],
    external: ["path"],
  }))
}

async function readPackageConfigs() {
  const dirs = await readdir(directoryPath)
  const configs = []

  for (const dir of dirs) {
    const configPath = new URL(`file://${directoryPath}/${dir}/package.rollup.config.js`)
    if (fs.existsSync(configPath)) {
      const packageConfig = await import(configPath)
      configs.push(packageConfig.default)
    } else {
      const defaultConf = defaultConfig(["cjs"], dir, false)
      configs.push(defaultConf)
    }
  }
  return configs.filter(v => v)
}

async function loadConfigs() {
  const packageConfigs = await readPackageConfigs()
  const buildConfig = packageConfigs.flat()

  return buildConfig
}

export default loadConfigs()
