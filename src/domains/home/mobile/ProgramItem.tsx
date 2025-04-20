"use client"

import { useState } from "react"

import { ProgramModal } from "./ProgramModal"

export interface Program {
  name: string
  season: "spring" | "summer" | "fall" | "winter"
  year: number
  period: {
    start: string
    end: string
  }
  description: string
  location: string
  staff: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  link?: string
  linkLabel?: string
  result?: string
}

export const getFormattedSeason = (season: Program["season"]) => {
  switch (season) {
    case "spring":
      return "춘계"
    case "summer":
      return "하계"
    case "fall":
      return "추계"
    case "winter":
      return "동계"
  }
}

export const ProgramItem = ({ program }: { program: Program }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <button
        className="box-border flex h-[370px] w-[290px] flex-shrink-0 cursor-pointer rounded-md bg-cover bg-center p-[2.25rem_1.875rem]"
        style={{ backgroundImage: `url(${program.image})` }}
        onClick={() => setOpenModal(true)}
        aria-controls="modal">
        <div className="flex flex-col items-start gap-2">
          <div className="flex gap-2">
            <span className="flex h-[18px] items-center justify-center rounded-[2px] bg-[#d2d2d2] px-[5px] py-[1px] text-sm font-normal text-[#b51f1f]">
              {program.year}
            </span>
            <span
              className={`flex h-[18px] items-center justify-center rounded-[2px] px-[5px] py-[1px] text-[0.75rem] font-normal text-white ${
                program.season === "summer" ? "bg-[#B77778]" : "bg-[#7794B7]"
              }`}>
              {getFormattedSeason(program.season)}
            </span>
          </div>
          <span className="text-2xl font-bold text-white">{program.name}</span>
          <span className="text-sm font-normal text-white">{`${program.period.start} ~ ${program.period.end}`}</span>
        </div>
      </button>
      <ProgramModal
        open={openModal}
        program={program}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}
