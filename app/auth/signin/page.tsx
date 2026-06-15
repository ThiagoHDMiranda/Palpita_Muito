"use client";

import AppBar from "@/components/appBar";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { status } = useSession();

  if (status === "authenticated") {
    return redirect("/");
  }

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <AppBar exitButton={false} />
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10">
          <div
            className={`flex items-center justify-center text-lg gap-5 cursor-pointer px-3 py-1.5 rounded-xl border hover:-translate-y-0.5 duration-100 text-green-600 border-green-600 bg-white`}
            onClick={() => signIn("google")}
          >
            <img
              className="w-8 h-8"
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google logo"
            />
            <span>Entrar com Google</span>
          </div>
        </div>
      )}
    </div>
  );
}
