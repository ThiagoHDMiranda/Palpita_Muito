"use client";

import { signOut } from "next-auth/react";
import Button from "./button";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AppBarProps {
  exitButton?: boolean;
  goBack?: boolean;
  fromPage?: string;
  resultsButton?: boolean;
}

export default function AppBar({
  exitButton = false,
  goBack = false,
  fromPage = "/",
  resultsButton = false,
}: AppBarProps) {
  const router = useRouter();
  return (
    <div
      className={`fixed top-0 left-0 w-full h-22 z-50
    flex items-center justify-center overflow-hidden
    shadow-xs shadow-amber-100/20 border-b border-(--secondary)/10
    bg-[rgb(11 63 34 / 80%)] backdrop-blur-lg`}
    >
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={() => router.push("/")}
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
      <Suspense>
        <AppBarButtons
          router={router}
          exitButton={exitButton}
          goBack={goBack}
          fromPage={fromPage}
          resultsButton={resultsButton}
        />
      </Suspense>
    </div>
  );
}

function AppBarButtons({
  router,
  exitButton = false,
  goBack = false,
  fromPage = "/",
  resultsButton = false,
}: AppBarProps & { router: AppRouterInstance }) {
  const param = useSearchParams();
  const from = param.get("from");

  return (
    <div className="flex items-center justify-center">
      {goBack && (
        <div className="absolute left-5 lg:left-15">
          <Button
            children="Voltar"
            color="white"
            onClick={() => router.push(from ?? "/")}
          />
        </div>
      )}
      {exitButton && (
        <div className="absolute right-5 lg:right-15">
          <Button children="Sair" color="white" onClick={() => signOut()} />
        </div>
      )}
      {/* {resultsButton && (
        <div className="absolute left-5 lg:left-15">
          <Button
            className="bg-gray-300 text-(--secondary) border border-gray-300 shadow-xs hover:shadow-md shadow-white/30"
            children="Resultados"
            color="custom"
            onClick={() => router.push(`/results?from=${fromPage}`)}
          />
        </div>
      )} */}
    </div>
  );
}
