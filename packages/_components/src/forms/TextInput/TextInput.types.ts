import { InputHTMLAttributes, ChangeEvent } from "react"
export interface TextInputTypes extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * value
   */
  value?: string | number | readonly string[]
  /**
   * border size
   */
  borderSize?: number | string | undefined
  /**
   * border style
   */
  borderStyle?: "solid" | "dotted"
  /**
   * border color
   */
  borderColor?: string | undefined
  /**
   * focus line color
   */
  outLineColor?: string | undefined
  /**
   * disabled background color
   */
  disabledColor?: string | undefined
  /**
   * background color
   */
  backgroundColor?: string | undefined
  /**
   * disabled
   */
  disabled?: boolean
  /**
   * width
   */
  width?: number
  /**
   * height
   */
  height?: number
  /**
   * display
   */
  display?: "flex" | "none" | "block" | "inline" | "inline-block"
  /**
   * onchange
   */
  onChange?: (_: ChangeEvent<HTMLInputElement>) => void | undefined
}
