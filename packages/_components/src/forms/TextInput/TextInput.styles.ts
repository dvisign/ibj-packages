import styled from "@emotion/styled"
import { TextInputTypes } from "./TextInput.types"

// 기본 입력 필드 스타일
export const InputBaseStyle = styled("input")<TextInputTypes>`
  display: ${({ display }) => display || "inline"};
  position: relative;
  border: ${({ borderSize }) => `${borderSize}px` || "1px"} ${({ borderStyle }) => borderStyle || "solid"}
    ${({ borderColor }) => borderColor || "#ccc"};
  font-size: 16px;
  width: ${({ width }) => (width ? width + "px" : "auto")};
  height: ${({ height }) => (height ? height + "px" : "auto")};
  padding: 8px 12px 8px 12px;
  border-radius: 0;
  transition: 0.3s;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : "#fff")};
  &:focus {
    outline: ${({ borderSize }) => `${borderSize}px` || "1px"} ${({ borderStyle }) => borderStyle || "solid"}
      ${({ outLineColor }) => outLineColor || "#007bff"};
  }
  &:disabled {
    background-color: ${({ disabledColor }) => (disabledColor ? disabledColor : "transparent")};
  }
`
