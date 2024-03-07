import rollupConfig from './packages/components/package.rollup.config'
import eslintConfig from './packages/eslint-config/package.rollup.config'
import tsConfig from './packages/typescript-config/package.rollup.config'
const buildConfig = [rollupConfig, eslintConfig, tsConfig].flat()
export default buildConfig
