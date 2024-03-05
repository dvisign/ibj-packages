import { memo } from "react"
import { LabelStyle } from "./TextLabel.styles."
import { TextLabelTypes } from "./TextLabel.types"

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
