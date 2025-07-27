import { PropsWithChildren } from "react"

export const HiddenText = ({ children }: PropsWithChildren) => {
  return (
    <span className="absolute -m-[1px] h-[1px] w-[1px] overflow-hidden">
      {children}
    </span>
  )
}
