"use strict"
import { baseConfig, nextConfig, reactLibraryConfig } from "@ibj/typescript-config"
import { libraryLintConfig, nextLintConfig } from "@ibj/eslint-config"
import { Buttons, TextInput, TextLabel } from "@ibj/_components"
const components = {
  Buttons,
  TextInput,
  TextLabel,
}
const ibjPackage = {
  baseConfig,
  nextConfig,
  reactLibraryConfig,
  libraryLintConfig,
  nextLintConfig,
  components,
}

export default ibjPackage
