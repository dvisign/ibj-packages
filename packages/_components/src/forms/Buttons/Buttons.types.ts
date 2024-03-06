import { ReactNode, ButtonHTMLAttributes } from "react"

export interface ButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 컨텐츠
   */
  children: ReactNode
  /**
   * 클릭 이벤트
   */
  onClick?: () => void
  /**
   * disabled
   */
  disabled?: boolean
}
