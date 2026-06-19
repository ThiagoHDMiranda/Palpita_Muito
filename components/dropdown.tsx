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
      <span className="flex text-(--primary)/70 py-1 font-bold">{label}</span>
      <div
        className="relative flex flex-col gap-1 text-(--secondary) w-60"
        ref={dropdownRef}
      >
        <span
          className="flex items-center justify-between w-full cursor-pointer px-2 py-1 rounded-md font-bold bg-(--primary)/60 text-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {list[chosen]}
          <DownArrow color="var(--color-gray-100)" />
        </span>
        <div
          className={`absolute w-full flex flex-col bg-gray-300 text-[14px] rounded-md gap-1 p-1 transition-all duration-200 ${isOpen ? "opacity-100 z-10 translate-y-9" : "opacity-0 -z-10"}`}
        >
          {list.map((item, index) => (
            <div
              key={item}
              className={`cursor-pointer text-nowrap p-1 rounded-md hover:bg-(--primary)/60 ${index === chosen && "font-bold bg-gray-300"}`}
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
