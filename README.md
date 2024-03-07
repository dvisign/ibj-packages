# 프로젝트 빌드 시스템

## 개요

본 프로젝트의 빌드 시스템은 롤업(Rollup)을 기반으로 하며, 다양한 패키지와 컴포넌트를 효율적으로 관리하고 빌드할 수 있도록 설계되었습니다. 이 시스템은 개별 패키지별로 커스텀 빌드 설정을 제공하며, 설정이 없는 경우 공통 빌드 설정을 적용합니다.

## 구조

```
/
├── packages/
│ ├── components/
│ │ └── Button/
│ │ ├── index.tsx
│ │ └── package-rollup.config.js
│ ├── eslint-config/
│ │ └── index.ts
│ └── utils/
│ └── index.ts
├── rollup.config.js
└── package.json
```

## 빌드 시스템 디자인

### 1. 패키지별 롤업 설정

각 패키지 폴더 내에 `package-rollup.config.js` 파일을 두어, 해당 패키지의 롤업 빌드를 구성합니다.

#### 예시 (`/packages/components/Button/package-rollup.config.js`):

```javascript
import typescript from "@rollup/plugin-typescript"

export default {
  input: "packages/components/Button/index.tsx",
  output: {
    dir: "dist/components/Button",
    format: "esm",
  },
  plugins: [typescript()],
}
```

### 2. 공통 빌드 설정

package-rollup.config.js가 없는 패키지에 대해서는 공통 빌드 설정을 적용합니다. 이 설정은 최상위 rollup.config.js에서 관리됩니다.

#### 예시 (/rollup.config.js):

```javascript
import fs from "fs"
import path from "path"
import { createCommonConfig } from "./commonBuildConfig"

const packageDir = path.join(__dirname, "packages")
const configs = []

fs.readdirSync(packageDir).forEach(subDir => {
  const packagePath = path.join(packageDir, subDir)
  const customConfigPath = path.join(packagePath, "package-rollup.config.js")

  if (fs.existsSync(customConfigPath)) {
    configs.push(require(customConfigPath).default)
  } else {
    // 공통 빌드 설정을 적용
    configs.push(createCommonConfig(packagePath))
  }
})

export default configs
```

### 3. 공통 빌드 설정 함수 (commonBuildConfig.js)

공통 빌드 설정을 생성하는 함수의 예시입니다. 이 함수는 input 경로와 output 파일 경로를 매개변수로 받습니다.

```javascript
export function createCommonConfig(inputPath) {
  return {
    input: `${inputPath}/index.ts`,
    output: {
      file: `${inputPath}/dist/bundle.js`,
      format: "esm",
    },
    plugins: [
      // 공통으로 사용할 플러그인
    ],
  }
}
```
