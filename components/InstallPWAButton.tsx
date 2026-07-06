"use client";

import SmartphoneSVG from "@/public/smartphoneIcon";
import { useEffect, useRef, useState } from "react";

export default function InstallPWAButton() {
  const [canInstall, setCanInstall] = useState(false);
  const deferredPrompt = useRef<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.current.prompt();
    await deferredPrompt.current.userChoice;
    deferredPrompt.current = null;
    setCanInstall(false);
  };

  if (!canInstall) return null;

  return (
    <div
      className="flex items-center justify-center gap-2 fixed right-5 bottom-15 sm:right-5 sm:bottom-4 overflow-visible py-2 px-3 font-bold cursor-pointer border border-gray-300 bg-(--secondary) text-foreground rounded-full z-50 hover:scale-105 duration-200"
      onClick={installPWA}
    >
      Instalar no dispositivo
      <SmartphoneSVG />
    </div>
  );
}
