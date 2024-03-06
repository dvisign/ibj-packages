import baseConfigJson from "./base.json"
import nextConfigJson from "./next-config.json"
import reactLibraryConfigJson from "./react-library.json"

const baseConfig = JSON.parse(JSON.stringify(baseConfigJson))
const nextConfig = JSON.parse(JSON.stringify(nextConfigJson))
const reactLibraryConfig = JSON.parse(JSON.stringify(reactLibraryConfigJson))

export { baseConfig, nextConfig, reactLibraryConfig }
