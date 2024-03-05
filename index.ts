// typescript-config 모듈에서 export한 내용을 import합니다.
import { baseConfig, nextConfig, reactLibraryConfig } from "@ibj/typescript-config"

// eslint-config 모듈에서 export한 내용을 import합니다.
import { libraryLintConfig, nextLintConfig } from "@ibj/eslint-config"

import MswGenerator from "@ibj/msw-config"

// 또는 export default를 사용하여 하나의 객체로 내보낼 수도 있습니다.
export default {
  baseConfig,
  nextConfig,
  reactLibraryConfig,
  libraryLintConfig,
  nextLintConfig,
  MswGenerator,
}
