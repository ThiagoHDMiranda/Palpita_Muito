"use client";

import { syncIfNeeded } from "@/server/indexedDB";
import { useEffect } from "react";

export default function SyncData() {
  useEffect(() => {
    syncIfNeeded();
  }, []);
  return null;
}
