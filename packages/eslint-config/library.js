const path = require("path");

const project = path.resolve(process.cwd(), "tsconfig.json");

module.exports = {
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    // ".*.js",
    "node_modules/",
    "*.json",
  ],
};
