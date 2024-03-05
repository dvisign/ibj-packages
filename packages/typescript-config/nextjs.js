const nextTsConfig = {
  display: "Next.js",
  extends: "./base.json",
  compilerOptions: {
    plugins: [{ name: "next" }],
    module: "ESNext",
    moduleResolution: "Bundler",
    allowJs: true,
    jsx: "preserve",
    declaration: false,
    declarationMap: false,
    incremental: true,
    lib: ["dom", "dom.iterable", "esnext"],
    resolveJsonModule: true,
    strict: true,
    target: "es5",
  },
}
export default nextTsConfig
