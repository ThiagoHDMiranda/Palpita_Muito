"use client";

import DownArrow from "@/public/downArrowIcon";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface DropdownProps {
  label: string;
  list: string[];
  chosen: number;
  setChosen: Dispatch<SetStateAction<number>>;
}

export default function Dropdown({
  label,
  list,
  chosen,
  setChosen,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const isOpenRef = useRef(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  function chooseItem(index: number) {
    setChosen(index);
    setIsOpen(false);
  }

  useEffect(() => {
    function onClickPage(ev: MouseEvent) {
      if (dropdownRef.current?.contains(ev.target as Node)) {
        return;
      }

      if (isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", onClickPage);
    return () => {
      document.removeEventListener("click", onClickPage);
    };
  }, [isOpen]);
  return (
    <div className="w-full justify-center flex gap-2">
      <span className="flex text-gray-300 py-1 font-bold">{label}</span>
      <div
        className="relative flex flex-col gap-1 text-(--secondary) w-60"
        ref={dropdownRef}
      >
        <span
          className="flex items-center justify-between w-full cursor-pointer px-2 py-1 rounded-md font-bold bg-gray-300 text-(--secondary) shadow-xs shadow-white/30"
          onClick={() => setIsOpen(!isOpen)}
        >
          {list[chosen]}
          <DownArrow color="var(--secondary)" />
        </span>
        <div
          className={`absolute w-full flex flex-col bg-gray-300 border border-(--secondary)/60 shadow-xs shadow-green-800/80  text-[14px] rounded-md gap-1 p-1 transition-all duration-200 ${isOpen ? "opacity-100 z-10 translate-y-9" : "opacity-0 -z-10"}`}
        >
          {list.map((item, index) => (
            <div
              key={item}
              className={`cursor-pointer text-nowrap p-1 rounded-md hover:bg-(--secondary)/40 ${index === chosen && "font-bold bg-gray-400"}`}
              onClick={() => chooseItem(index)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
