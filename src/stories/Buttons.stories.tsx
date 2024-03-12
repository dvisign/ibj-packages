import React, { useState } from "react"
import { action } from "@storybook/addon-actions"
import type { Meta, StoryObj } from "@storybook/react"
import { ButtonTypes, Buttons } from "@/components"

const meta = {
  title: "Component/Atoms/Forms/Buttons",
  component: Buttons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Buttons>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    children: "Button",
  },
  render: function Template(args: ButtonTypes) {
    const [count, setCount] = useState<number>(0)
    function onClick() {
      setCount(count + 1)
      action("clicked")(count + 1)
    }
    return <Buttons onClick={onClick}>{args.children}</Buttons>
  },
}
