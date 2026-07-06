import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Palpita Muito",
  description: "Palpita Muito - Palpites da copa",
  openGraph: {
    title: "Palpita Muito",
    description: "Palpites da copa",
    images: ["/palpita_muito_logo_512x512.png"],
  },
};

import { Toaster } from "react-hot-toast";
import SyncData from "./syncData";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <SyncData /> */}
        <Providers>
          <ServiceWorkerRegister />
          <div>{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
