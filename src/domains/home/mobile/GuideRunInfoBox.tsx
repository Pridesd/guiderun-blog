"use client";

import { useState, useRef, useEffect } from "react";

import { GuideRunInfo } from "./GuideRun";

import { Icon } from "@/components/animations/shared";

interface GuideRunInfoBoxProps {
  info: GuideRunInfo;
  open: boolean;
  onChangeOpen: VoidFunction;
}

export const GuideRunInfoBox = ({
  info,
  open,
  onChangeOpen,
}: GuideRunInfoBoxProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const contentId = `guiderun-content-${info.link}`;

  useEffect(() => {
    if (open && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open, info]);

  return (
    <div className="w-full flex flex-col items-end gap-4 z-[1]">
      <button
        className="flex items-center justify-end gap-3 bg-transparent border-none cursor-pointer text-white pr-[0.125rem]"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onChangeOpen}
      >
        <h3
          className={`text-[2rem] font-thin text-white origin-right transition-transform duration-200 ease-in-out ${
            open ? "scale-[0.875]" : "scale-100"
          }`}
        >
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
        style={{ maxHeight: open ? `${contentHeight}px` : "0px" }}
      >
        <div ref={contentRef}>
          <div className="flex flex-col pr-3 gap-3 items-end">
            <span className="font-thin text-[#ccc] text-center">
              {info.content}
            </span>
            <a
              href={info.link}
              className="no-underline flex gap-2 items-center justify-end pr-[5px] pb-[3px] mb-[2px] border-b border-[#aaa] focus:outline-2 focus:outline-white focus:outline-offset-2"
            >
              <span className="font-semibold" color="#FFF">
                {info.linkLabel}
              </span>
              <Icon icon="ArrowRightSmall" alt="" />
            </a>
          </div>
        </div>
      </div>
      <hr
        className={`mt-[-1rem] border-t border-[#aaa] ${open ? "animate-fade-out-width" : "animate-fade-out-width"}`}
        aria-hidden="true"
      />
    </div>
  );
};
