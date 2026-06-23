"use client";

import { redirect, usePathname } from "next/navigation";
import Button from "./button";
import NAVIGATION_TAB_BUTTONS from "@/constants/navigationTabButtons";

export default function NavitationTab() {
  const pathname = usePathname();
  return (
    <div className="w-full">
      <div
        className={`fixed bottom-0 left-0 w-full sm:relative flex items-end sm:items-center justify-center sm:h-auto sm:py-5 z-40`}
      >
        {NAVIGATION_TAB_BUTTONS.map((button) => {
          return (
            <Button
              key={button.label}
              color="custom"
              onClick={() => redirect(button.pathname)}
              className={`rounded-bl-none rounded-br-none w-full sm:w-fit h-10 sm:absolute 
            ${
              pathname === button.pathname
                ? "bg-(--secondary) sm:bg-transparent text-lg sm:text-xl h-12 text-gray-300 border-gray-300 sm:hover:translate-none"
                : "bg-neutral-500 text-(--secondary) border-(--secondary) sm:rounded-xl sm:px-5 sm:hover:bg-neutral-400 sm:shadow-xs sm:hover:shadow-md sm:shadow-white/30" +
                  (button.pathname === "/" ? " right-5" : " left-5")
            }
          inset-shadow-xs inset-shadow-amber-100/20 sm:inset-shadow-none sm:border-none 
          `}
            >
              <div className={`${button.className}`}>
                <button.svgIcon
                  color={
                    pathname === button.pathname
                      ? "var(--color-gray-300)"
                      : "var(--secondary)"
                  }
                  size={pathname === button.pathname ? 32 : 25}
                />
              </div>
              <span>{button.label}</span>
            </Button>
          );
        })}
      </div>
      <hr className="hidden sm:flex mt-5 mb-10" />
    </div>
  );
}
