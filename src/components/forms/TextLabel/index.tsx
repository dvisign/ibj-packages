import React, { memo } from "react"
import { LabelStyle } from "./TextLabel.styles."
import type { TextLabelTypes } from "./TextLabel.types"

function TextLabel({ label, className = "", htmlFor }: TextLabelTypes) {
  return (
    label && (
      <LabelStyle className={className} htmlFor={htmlFor}>
        {label}
      </LabelStyle>
    )
  )
}
export default memo(TextLabel)

export { type TextLabelTypes }
