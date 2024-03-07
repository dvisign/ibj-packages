import React from 'react'
import { useButton } from "@mui/base"
import { clsx } from "clsx"
import { memo } from "react"

import { ButtonBase } from "./Buttons.styles"
import type { ButtonTypes } from "./Buttons.types"

function Button({ children, disabled, ...props }: ButtonTypes) {
  const { active, focusVisible, getRootProps } = useButton({
    ...props,
  })
  const classes = {
    active,
    disabled,
    focusVisible,
    ...(props.className ? { [props.className]: true } : {}),
  }
  const rootProps = {
    ...getRootProps(),
    ...props,
    type: props?.type ? props.type : "submit",
  }
  return (
    <ButtonBase {...rootProps} className={clsx(classes)}>
      {children}
    </ButtonBase>
  )
}
export default memo(Button)

export { type ButtonTypes }
