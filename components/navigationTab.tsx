"use client";

import { redirect, usePathname } from "next/navigation";
import Button from "./button";
import NAVIGATION_TAB_BUTTONS from "@/constants/navigationTabButtons";

export default function NavitationTab() {
  const pathname = usePathname();
  return (
    <div
      className={`fixed bottom-0 left-0 w-full sm:relative flex items-end justify-center h-12 sm:h-auto sm:pt-10 z-40`}
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
                ? "bg-(--secondary) sm:bg-transparent text-lg sm:text-xl h-12 text-(--primary) border-(--primary)/50 sm:hover:translate-none"
                : "bg-neutral-500 text-(--secondary) border-(--secondary) sm:rounded-xl sm:px-5 sm:hover:bg-gray-400" +
                  (button.pathname === "/" ? " right-5" : " left-5")
            }
          inset-shadow-xs inset-shadow-amber-100/20 sm:inset-shadow-none sm:border-none  
          `}
          >
            <div className={`${button.className}`}>
              <button.svgIcon
                color={
                  pathname === button.pathname
                    ? "var(--primary)"
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
  );
}
