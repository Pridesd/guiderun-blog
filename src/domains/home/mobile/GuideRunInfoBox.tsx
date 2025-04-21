"use client"

import { useState, useRef, useEffect } from "react"

import { GuideRunInfo } from "./GuideRun"

import { Icon } from "@/components/animations/shared"

interface GuideRunInfoBoxProps {
  info: GuideRunInfo
  open: boolean
  onChangeOpen: VoidFunction
}

export const GuideRunInfoBox = ({
  info,
  open,
  onChangeOpen,
}: GuideRunInfoBoxProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  const contentId = `guiderun-content-${info.link}`

  useEffect(() => {
    if (open && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [open, info])

  return (
    <div className="z-[1] flex w-full flex-col items-end gap-4">
      <button
        className="flex cursor-pointer items-center justify-end gap-3 border-none bg-transparent pr-[0.125rem] text-white"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onChangeOpen}>
        <h3
          className={`origin-right text-[2rem] font-thin text-white transition-transform duration-200 ease-in-out ${
            open ? "scale-[0.875]" : "scale-100"
          }`}>
          {info.title}
        </h3>
        <Icon
          icon="ArrowRightUp"
          alt=""
          className={`transition-transform duration-300 ease-in-out ${
            open ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>
      <div
        id={contentId}
        aria-hidden={!open}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: open ? `${contentHeight}px` : "0px" }}>
        <div ref={contentRef}>
          <div className="flex flex-col items-end gap-3 pr-3">
            <span className="text-center font-thin text-[#ccc]">
              {info.content}
            </span>
            <a
              href={info.link}
              className="mb-[2px] flex items-center justify-end gap-2 border-b border-[#aaa] pr-[5px] pb-[3px] no-underline focus:outline-2 focus:outline-offset-2 focus:outline-white">
              <span className="font-semibold text-white">{info.linkLabel}</span>
              <Icon icon="ArrowRightSmall" alt="" />
            </a>
          </div>
        </div>
      </div>
      <hr
        className={`mt-[-1rem] border-t border-[#aaa] ${open ? "animate-fade-out-width" : "animate-fade-in-width"}`}
        aria-hidden="true"
      />
    </div>
  )
}
