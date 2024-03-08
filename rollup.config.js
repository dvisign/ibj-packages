import rollupConfig from "./packages/components/package.rollup.config"
import eslintConfig from "./packages/eslint-config/package.rollup.config"
import tsConfig from "./packages/typescript-config/package.rollup.config"
import fs from "fs"
import path from "path"
import { promisify } from "util"

const readdir = promisify(fs.readdir)

const directoryPath = path.join(process.cwd(), "packages")

async function readConfigFiles() {
  try {
    const dirs = await readdir(directoryPath)
    const configPromises = dirs.map(async dir => {
      const configPath = path.join(directoryPath, dir, "package.rollup.config.js")
      if (fs.existsSync(configPath)) {
        return import(configPath)
      }
    })
    const configs = await Promise.all(configPromises)
    const flatConfigs = configs.flat().filter(Boolean)
    return flatConfigs
  } catch (err) {
    console.error("Error reading configuration files.", err)
  }
}

async function loadConfigs() {
  const configs = await readConfigFiles()
  return configs
}

export default loadConfigs()

// const buildConfig = [rollupConfig, eslintConfig, tsConfig].flat()

// export default buildConfig
