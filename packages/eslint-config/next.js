// const fs = require("node:fs")
const { resolve } = require("node:path")
const project = resolve(process.cwd(), "tsconfig.json")

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
  ignorePatterns: [
    // Ignore dotfiles
    // ".*.js",
    "*.json",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  plugins: ["@typescript-eslint", "react", "autofix", "react-hooks", "prettier"],
  settings: {
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
    // "import/order": [
    //   "error",
    //   {
    //     "newlines-between": "always",
    //     pathGroups: [
    //       ...getDirectoriesToSort().map((singleDir) => ({
    //         pattern: `${singleDir}/**`,
    //         group: "internal",
    //       })),
    //       {
    //         pattern: "@repo/**",
    //         group: "internal",
    //       },
    //       {
    //         pattern: "env",
    //         group: "internal",
    //       },
    //       {
    //         pattern: "theme",
    //         group: "internal",
    //       },
    //       {
    //         pattern: "public/**",
    //         group: "internal",
    //         position: "after",
    //       },
    //     ],
    //     groups: [
    //       "external",
    //       "builtin",
    //       "internal",
    //       "sibling",
    //       "parent",
    //       "index",
    //     ],
    //     pathGroupsExcludedImportTypes: ["internal"],
    //     alphabetize: {
    //       order: "asc",
    //       caseInsensitive: true,
    //     },
    //   },
    // ],
    // "import/no-unused-modules": "warn",
    // "import/no-webpack-loader-syntax": "error",
    // "import/newline-after-import": ["error", { count: 1 }],
    // "import/no-duplicates": ["error", { considerQueryString: true }],
  },
}
// function getDirectoriesToSort() {
//   const ignoredSortingDirectories = [".git", ".next", ".vscode", "node_modules"]
//   return getDirectories(process.cwd()).filter(f => !ignoredSortingDirectories.includes(f))
// }

// function getDirectories(path) {
//   return fs.readdirSync(path).filter(file => {
//     return fs.statSync(`${path}/${file}`).isDirectory()
//   })
// }
