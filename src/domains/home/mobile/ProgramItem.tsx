"use client";

import { useState } from "react";

import { ProgramModal } from "./ProgramModal";

export interface Program {
  name: string;
  season: "spring" | "summer" | "fall" | "winter";
  year: number;
  period: {
    start: string;
    end: string;
  };
  description: string;
  location: string;
  staff: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  link?: string;
  linkLabel?: string;
  result?: string;
}

export const getFormattedSeason = (season: Program["season"]) => {
  switch (season) {
    case "spring":
      return "춘계";
    case "summer":
      return "하계";
    case "fall":
      return "추계";
    case "winter":
      return "동계";
  }
};

export const ProgramItem = ({ program }: { program: Program }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="flex box-border p-[2.25rem_1.875rem] flex-shrink-0 w-[290px] h-[370px] rounded-md bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: `url(${program.image})` }}
        onClick={() => setOpenModal(true)}
        aria-controls="modal"
      >
        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-2">
            <span className="flex items-center justify-center h-[18px] px-[5px] py-[1px] rounded-[2px] bg-[#d2d2d2] text-[#b51f1f] text-sm font-normal">
              {program.year}
            </span>
            <span
              className={`flex items-center justify-center h-[18px] px-[5px] py-[1px] rounded-[2px] text-white text-[0.75rem] font-normal ${
                program.season === "summer" ? "bg-[#B77778]" : "bg-[#7794B7]"
              }`}
            >
              {getFormattedSeason(program.season)}
            </span>
          </div>
          <span className="text-white text-2xl font-bold">{program.name}</span>
          <span className="text-white text-sm font-normal">{`${program.period.start} ~ ${program.period.end}`}</span>
        </div>
      </button>
      <ProgramModal
        open={openModal}
        program={program}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};
