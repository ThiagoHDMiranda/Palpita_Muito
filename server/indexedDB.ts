"use client";

import { MatchIndexedDBType } from "@/types/match";
import {
  getGuessesActions,
  GuessDBType,
  setGuess,
} from "./actions/guess.action";
import { ActionResult } from "@/types/actionResult";
import {
  getAllMatchResultsActions,
  MatchResultType,
} from "./actions/matchResult.action";

const DB_NAME = "WCDB";
const DB_VERSION = 1;

export function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("results")) {
        db.createObjectStore("results", { keyPath: "matchId" });
      }

      if (!db.objectStoreNames.contains("guesses")) {
        db.createObjectStore("guesses", { keyPath: "matchId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllGuesses() {
  const db = await openIndexedDB();

  return new Promise<MatchIndexedDBType[] | null>((resolve, reject) => {
    const tx = db.transaction("guesses", "readonly");
    const store = tx.objectStore("guesses");

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => resolve(getAllRequest.result);
    getAllRequest.onerror = () => reject(getAllRequest.error);
  });
}

export async function getAllResults() {
  const db = await openIndexedDB();

  return new Promise<MatchIndexedDBType[] | null>((resolve, reject) => {
    const tx = db.transaction("results", "readonly");
    const store = tx.objectStore("results");

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => resolve(getAllRequest.result);
    getAllRequest.onerror = () => reject(getAllRequest.error);
  });
}

export async function saveGuessIndexedDB({
  matchId,
  homeGoals,
  awayGoals,
}: MatchIndexedDBType): Promise<ActionResult<GuessDBType>> {
  const saveGuessDB: ActionResult<GuessDBType> = await setGuess(
    matchId,
    homeGoals,
    awayGoals,
  );

  if (!saveGuessDB.success) {
    return { success: false, message: saveGuessDB.message };
  }

  const db = await openIndexedDB();

  return new Promise<ActionResult<GuessDBType>>((resolve, reject) => {
    const tx = db.transaction("guesses", "readwrite");
    const store = tx.objectStore("guesses");

    store.put({
      matchId: saveGuessDB.data.matchId,
      homeGoals: saveGuessDB.data.homeGoals,
      awayGoals: saveGuessDB.data.awayGoals,
    });

    tx.oncomplete = () => resolve(saveGuessDB);
    tx.onerror = () =>
      reject({ success: false, message: "Erro ao salvar registro" });
  });
}

export async function setGuessesIndexedDB(guesses: GuessDBType[]) {
  const db = await openIndexedDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("guesses", "readwrite");
    const store = tx.objectStore("guesses");

    guesses.map((guess) =>
      store.put({
        matchId: guess.matchId,
        homeGoals: guess.homeGoals,
        awayGoals: guess.awayGoals,
      }),
    );

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function setResultsIndexedDB(results: MatchResultType[]) {
  const db = await openIndexedDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("results", "readwrite");
    const store = tx.objectStore("results");

    results.map((result) =>
      store.put({
        matchId: result.matchId,
        homeGoals: result.homeGoals,
        awayGoals: result.awayGoals,
      }),
    );

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function getSessionStorage(item: string) {
  return sessionStorage.getItem(item);
}

export function setSessionStorage(item: string, value: "true" | "false") {
  return sessionStorage.setItem(item, value);
}

export async function handleGuesses() {
  const result = await getGuessesActions();

  if (!result.success) {
    return false;
  }

  setGuessesIndexedDB(result.data);
  return true;
}

export async function handleResults() {
  const result = await getAllMatchResultsActions();

  if (!result.success) {
    return false;
  }

  setResultsIndexedDB(result.data);
  return true;
}

export async function syncIfNeeded() {
  if (getSessionStorage("sync_done")) {
    return;
  }

  const isGuessesOk = await handleGuesses();
  const isResultsOk = await handleResults();

  if (!isGuessesOk || !isResultsOk) {
    return;
  }

  setSessionStorage("sync_done", "true");
}
