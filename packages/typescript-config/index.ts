// JSON 파일을 import합니다.
import baseConfigJson from "./base.json"
import nextConfigJson from "./next-config.json"
import reactLibraryConfigJson from "./react-library.json"

// JSON 파일을 JavaScript 객체로 변환합니다.
const baseConfig = JSON.parse(JSON.stringify(baseConfigJson))
const nextConfig = JSON.parse(JSON.stringify(nextConfigJson))
const reactLibraryConfig = JSON.parse(JSON.stringify(reactLibraryConfigJson))

// JavaScript 객체를 export합니다.
export { baseConfig, nextConfig, reactLibraryConfig }
