import styled from "@emotion/styled"
import { ButtonTypes } from "./Buttons.types"

export const ButtonBase = styled("button")<ButtonTypes>`
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  &:not(.disabled):hover {
    background-color: #0056b3;
  }
  &.disabled {
    opacity: 0.5;
  }
`
