import { memo } from "react"
import { useInput } from "@mui/base"
import { InputBaseStyle } from "./TextInput.styles"
import type { TextInputTypes } from "./TextInput.types"

function TextInput(props: TextInputTypes) {
  const { getRootProps, getInputProps } = useInput(props)
  const inputProps = getInputProps()

  // `value` 속성이 `undefined`인 경우 빈 문자열(`''`)을 기본값으로 사용
  const value = inputProps.value !== undefined ? inputProps.value : ""

  return (
    <div {...getRootProps()}>
      <InputBaseStyle {...props} autoComplete={props.type === "password" ? "off" : ""} {...inputProps} value={value} />
    </div>
  )
}
export default memo(TextInput)

export { type TextInputTypes }
