const path = require("path")

const project = path.resolve(process.cwd(), "tsconfig.json")

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "prettier",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["*.json", "node_modules/", "dist/"],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  plugins: ["@typescript-eslint", "react", "autofix", "react-hooks", "prettier"],
  settings: {
    react: {
      version: "detect",
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
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@next/next/no-html-link-for-pages": "off",
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off",
    "spaced-comment": "warn",
    quotes: ["error", "double"],
    "no-console": "warn",
    "no-redeclare": "warn",
    "react/display-name": "off",
    "react/jsx-key": "warn",
    "arrow-body-style": "off",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_|^e$",
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: "^_|^e$",
      },
    ],
    "brace-style": "off",
    "import/no-unresolved": [
      "error",
      { ignore: ["\\@.*$"] }, // all our aliases start with a @ sign
    ],
  },
}
