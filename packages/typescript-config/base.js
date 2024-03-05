const base = {
  display: "Default",
  compilerOptions: {
    target: "es5",
    lib: ["dom", "dom.iterable", "esnext", "es6"],
    allowJs: true,
    strict: false,
    incremental: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    module: "ESNext",
    moduleResolution: "Bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "preserve",
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    composite: false,
    declaration: true,
    declarationMap: true,
    inlineSources: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    preserveWatchOutput: true,
    strictNullChecks: true,
    plugins: [
      {
        name: "next",
      },
    ],
  },
  exclude: ["node_modules"],
}
export default base
