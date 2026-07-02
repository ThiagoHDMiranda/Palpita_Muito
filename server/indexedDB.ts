"use client";

import {
  GuessDBType,
  GuessIndexedDBType,
  MatchIndexedDBType,
  MatchResultType,
} from "@/types/match";
import {
  getAllGuessesActions,
  getGuessesByUserActions,
  setGuessActions,
} from "./actions/guess.action";
import { ActionResult } from "@/types/actionResult";
import { getAllMatchResultsActions } from "./actions/matchResult.action";
import { getAllUsersActions } from "./actions/user.actions";

const DB_NAME = "WCDB";
const DB_VERSION = 3;

function createObjectStore(
  objectStore: string,
  keypath: string,
  db: IDBDatabase,
) {
  if (!db.objectStoreNames.contains(objectStore)) {
    db.createObjectStore(objectStore, { keyPath: keypath });
  }
}

export function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      createObjectStore("results", "matchId", db);
      createObjectStore("guessesUser", "matchId", db);
      createObjectStore("users", "userId", db);
      createObjectStore("guesses", "matchId", db);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

type IDBTransactionModeType = "readonly" | "readwrite" | "versionchange";

function getAllRecords(
  objectStore: string,
  type: IDBTransactionModeType,
  db: IDBDatabase,
) {
  const tx = db.transaction(objectStore, type);
  const store = tx.objectStore(objectStore);

  const getAllRequest = store.getAll();

  return getAllRequest;
}

export async function getAllGuessesFromUserIndexedDB() {
  const db = await openIndexedDB();

  return new Promise<GuessIndexedDBType[] | null>((resolve, reject) => {
    const getAllRequest = getAllRecords("guessesUser", "readonly", db);

    getAllRequest.onsuccess = () => resolve(getAllRequest.result);
    getAllRequest.onerror = () => reject(getAllRequest.error);
  });
}

export async function getAllResultsIndexedDB() {
  const db = await openIndexedDB();

  return new Promise<MatchIndexedDBType[] | null>((resolve, reject) => {
    const getAllRequest = getAllRecords("results", "readonly", db);

    getAllRequest.onsuccess = () => resolve(getAllRequest.result);
    getAllRequest.onerror = () => reject(getAllRequest.error);
  });
}

export async function getAllUsersIndexedDB() {
  const db = await openIndexedDB();

  return new Promise<{ userId: string; name: string | null }[] | null>(
    (resolve, reject) => {
      const getAllRequest = getAllRecords("users", "readonly", db);

      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    },
  );
}

export async function getAllGuessesIndexedDB() {
  const db = await openIndexedDB();

  return new Promise<(MatchIndexedDBType & { userId: string })[] | null>(
    (resolve, reject) => {
      const getAllRequest = getAllRecords("guesses", "readonly", db);

      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    },
  );
}

export async function saveGuessFromUserIndexedDB({
  matchId,
  homeGoals,
  awayGoals,
}: GuessIndexedDBType): Promise<ActionResult<GuessDBType>> {
  const saveGuessDB: ActionResult<GuessDBType> = await setGuessActions(
    matchId,
    homeGoals,
    awayGoals,
    0,
  );

  if (!saveGuessDB.success) {
    return { success: false, message: saveGuessDB.message };
  }

  const db = await openIndexedDB();

  return new Promise<ActionResult<GuessDBType>>((resolve, reject) => {
    const txGuessesUser = db.transaction("guessesUser", "readwrite");
    const storeGuessesUser = txGuessesUser.objectStore("guessesUser");

    storeGuessesUser.put({
      matchId: saveGuessDB.data.matchId,
      homeGoals: saveGuessDB.data.homeGoals,
      awayGoals: saveGuessDB.data.awayGoals,
      extraTime: false,
      homeETGoals: null,
      awayETGoals: null,
      homePenalties: null,
      awayPenalties: null,
      points: saveGuessDB.data.points,
    });

    const txGuesses = db.transaction("guesses", "readwrite");
    const storeGuesses = txGuesses.objectStore("guesses");

    storeGuesses.put({
      userId: saveGuessDB.data.userId,
      matchId: saveGuessDB.data.matchId,
      homeGoals: saveGuessDB.data.homeGoals,
      awayGoals: saveGuessDB.data.awayGoals,
      extraTime: false,
      homeETGoals: null,
      awayETGoals: null,
      homePenalties: null,
      awayPenalties: null,
      points: saveGuessDB.data.points,
    });

    txGuessesUser.oncomplete = () => resolve(saveGuessDB);
    txGuessesUser.onerror = () =>
      reject({ success: false, message: "Erro ao salvar registro" });
  });
}

async function setGuessesFromUserIndexedDB(guesses: GuessDBType[]) {
  const db = await openIndexedDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("guessesUser", "readwrite");
    const store = tx.objectStore("guessesUser");

    guesses.map((guess) =>
      store.put({
        matchId: guess.matchId,
        homeGoals: guess.homeGoals,
        awayGoals: guess.awayGoals,
        extraTime: false,
        homeETGoals: null,
        awayETGoals: null,
        homePenalties: null,
        awayPenalties: null,
        points: guess.points,
      }),
    );

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function setResultsIndexedDB(results: MatchResultType[]) {
  const db = await openIndexedDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("results", "readwrite");
    const store = tx.objectStore("results");

    results.map((result) =>
      store.put({
        matchId: result.matchId,
        homeGoals: result.homeGoals,
        awayGoals: result.awayGoals,
        extraTime: result.extraTime,
        homeETGoals: result.homeETGoals,
        awayETGoals: result.awayETGoals,
        homePenalties: result.homePenalties,
        awayPenalties: result.awayPenalties,
        points: 0,
      }),
    );

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function setUsersIndexedDB(users: { id: string; name: string | null }[]) {
  const db = await openIndexedDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    console.log("setUsersIndexedDB: ", users);
    users.forEach((user) => {
      store.put({
        userId: user.id,
        name: user.name,
      });
    });

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function setGuessesIndexedDB(guesses: GuessDBType[]) {
  const db = await openIndexedDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("guesses", "readwrite");
    const store = tx.objectStore("guesses");
    console.log("setGuessesIndexedDB: ", guesses);

    guesses.map((guess) => {
      store.put({
        userId: guess.userId,
        matchId: guess.matchId,
        homeGoals: guess.homeGoals,
        awayGoals: guess.awayGoals,
        extraTime: false,
        homeETGoals: null,
        awayETGoals: null,
        homePenalties: null,
        awayPenalties: null,
        points: guess.points,
      });
    });

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

export async function handleGuessesFromUser() {
  const result = await getGuessesByUserActions();

  if (!result.success) {
    return false;
  }

  setGuessesFromUserIndexedDB(result.data);
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

export async function handleUsers() {
  const result = await getAllUsersActions();

  if (!result.success) {
    return false;
  }

  setUsersIndexedDB(result.data);
  return true;
}

export async function handleGuesses() {
  const result = await getAllGuessesActions();

  if (!result.success) {
    return false;
  }

  setGuessesIndexedDB(result.data);
  return true;
}

export async function updateResultsAndGuesses() {
  const isGuessesFromUserOk = await handleGuessesFromUser();
  const isResultsOk = await handleResults();
  const isUsersOk = await handleUsers();
  const isGuessesOk = await handleGuesses();

  if (!isGuessesFromUserOk || !isResultsOk || !isUsersOk || isGuessesOk) {
    return false;
  }

  return true;
}

export async function syncIfNeeded() {
  if (getSessionStorage("sync_done")) {
    return;
  }

  const isResultsAndGuessesUpdated = updateResultsAndGuesses();

  if (!isResultsAndGuessesUpdated) {
    return;
  }

  setSessionStorage("sync_done", "true");
}
