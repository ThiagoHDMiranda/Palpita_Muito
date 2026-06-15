"use client";

import { signOut } from "next-auth/react";
import Button from "./button";
import { redirect } from "next/navigation";

interface AppBarProps {
  exitButton?: boolean;
  goBack?: boolean;
}

export default function AppBar({
  exitButton = false,
  goBack = false,
}: AppBarProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-22 z-50
    flex items-center justify-center overflow-hidden
    shadow-xs shadow-amber-100/20 border-b border-(--primary)/10
    bg-[rgb(11 63 34 / 80%)] backdrop-blur-sm`}
    >
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={() => redirect("/")}
      >
        <img
          className="absolute w-30 translate-y-3"
          src="/palpita_muito_text_384x256.png"
          alt="Palpita Muito text in image"
        />
        <img
          className="absolute w-5 -translate-y-8"
          src="/palpita_muito_logo_50x33.png"
          alt="Palpita Muito logo"
        />
      </div>
      {goBack && (
        <div className="absolute left-5">
          <Button
            children="Voltar"
            color="white"
            onClick={() => redirect("/")}
          />
        </div>
      )}
      {exitButton && (
        <div className="absolute right-5">
          <Button children="Sair" color="white" onClick={() => signOut()} />
        </div>
      )}
    </div>
  );
}
