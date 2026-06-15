"use client";

import { redirect, usePathname } from "next/navigation";
import Button from "./button";
import NAVIGATION_TAB_BUTTONS from "@/constants/navigationTabButtons";

export default function NavitationTab() {
  const pathname = usePathname();
  return (
    <div
      className={`fixed bottom-0 left-0 w-full sm:static flex items-end justify-center h-12 sm:h-auto z-50`}
    >
      {NAVIGATION_TAB_BUTTONS.map((button) => (
        <Button
          key={button.label}
          color="custom"
          onClick={() => redirect(button.pathname)}
          className={`rounded-bl-none rounded-br-none w-full h-10 ${pathname === button.pathname ? "bg-(--secondary) text-lg h-12 text-(--primary) border-(--primary)/50 " : "bg-neutral-500 text-(--secondary) border-(--secondary)"}
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
              size={pathname === button.pathname ? 28 : 25}
            />
          </div>
          <span>{button.label}</span>
        </Button>
      ))}
    </div>
  );
}
