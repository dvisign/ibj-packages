const { resolve } = require("path")

module.exports = {
  extends: ["./packages/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: resolve(__dirname, "./tsconfig.json"),
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: resolve(__dirname, "tsconfig.json"),
      },
    },
  },
}
