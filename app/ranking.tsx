"use client";

import Loading from "@/components/loading";
import MATCHES, { MatchType } from "@/constants/matches";
import DownArrow from "@/public/downArrowIcon";
import UpdateSVG from "@/public/updateIcon";
import {
  getAllGuessesIndexedDB,
  getAllResultsIndexedDB,
  getAllUsersIndexedDB,
  syncIfNeeded,
  updateResultsAndGuesses,
} from "@/server/indexedDB";
import { MatchIndexedDBType } from "@/types/match";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type UserGuessesType = {
  userId: string;
  name: string | null;
  guesses: (MatchIndexedDBType & {
    userId: string;
  })[];
  points: number;
};

export default function Ranking() {
  const [users, setUsers] = useState<
    (UserGuessesType & { position: number })[] | null
  >(null);
  const [results, setResults] = useState<MatchIndexedDBType[] | null>(null);
  const [matchId, setMatchId] = useState<number>(1);
  const [currentMatch, setCurrentMatch] = useState<MatchType>(MATCHES[0]);
  const [currentResult, setCurrentResult] = useState<MatchIndexedDBType | null>(
    null,
  );

  const lastIndex = MATCHES.length - 1;

  async function getUsersAndGuesses() {
    const users = await getAllUsersIndexedDB();
    const guesses = await getAllGuessesIndexedDB();
    if (!users || !guesses) return;

    const usersAndGuesses: UserGuessesType[] = users.map((user) => {
      const filteredGuesses = guesses.filter(
        (guess) => guess.userId === user.userId,
      );
      const sumPoints = filteredGuesses.reduce(
        (points, current) => points + current.points,
        0,
      );
      return {
        userId: user.userId,
        name: user.name,
        guesses: filteredGuesses,
        points: sumPoints,
      };
    });
    usersAndGuesses.sort((user1, user2) => user2.points - user1.points);

    let position = 1;

    const usersAndGuessesOrdered = usersAndGuesses.map((user, index) => {
      if (index === 0) {
        return {
          ...user,
          position: position,
        };
      }

      if (user.points === usersAndGuesses[index - 1].points) {
        return {
          ...user,
          position: position,
        };
      }

      position = index + 1;

      return {
        ...user,
        position: position,
      };
    });

    // console.log("usersAndGuesses: ", usersAndGuesses);
    setUsers(usersAndGuessesOrdered);
  }

  async function getResults() {
    const result = await getAllResultsIndexedDB();
    if (!result || !result[0]) {
      setResults(null);
      return;
    }

    const lastResultId = result[result.length - 1].matchId;
    setMatchId(lastResultId);
    setCurrentMatch(MATCHES[lastResultId - 1]);
    setResults(result);
    setCurrentResult(result[result.length - 1] ?? null);
  }

  async function getData() {
    await syncIfNeeded();

    await getUsersAndGuesses();
    await getResults();
  }

  function changeMatchId(type: "decrease" | "increase") {
    let newMatchId = matchId;

    if (type === "decrease") {
      if (newMatchId !== 1) {
        newMatchId = matchId - 1;
      }
    } else {
      if (newMatchId !== lastIndex + 1) {
        newMatchId = matchId + 1;
      }
    }

    const currentMatchResult = results?.filter(
      (result) => result.matchId === newMatchId,
    );

    setCurrentResult(
      currentMatchResult && currentMatchResult[0]
        ? currentMatchResult[0]
        : null,
    );

    const currentMatchId = MATCHES.filter((match) => match.id === newMatchId);
    if (!currentMatchId[0]) return;
    setCurrentMatch(currentMatchId[0]);

    setMatchId(newMatchId);
  }

  async function updateData() {
    const toastId = toast.loading("Atualizando");

    const result = await updateResultsAndGuesses();

    if (!result) {
      toast.error("Erro ao atualizar dados", { id: toastId });
      return;
    }
    toast.success("Dados atualizados com sucesso", { id: toastId });
    getData();
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex w-full justify-center">
      {!users || !users[0] ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full max-w-111 sm:max-w-125 md:max-w-148 overflow-x-auto overflow-y-hidden self-center gap-2 bg-gray-300 rounded-xl mb-10 p-2 pt-4 scrollbar-thumb-(--secondary)">
          <div className="w-full">
            <div
              className="w-fit h-fit cursor-pointer bg-(--secondary) rounded-full p-1 sm:ml-4"
              onClick={() => updateData()}
            >
              <UpdateSVG />
            </div>
            <div className="flex gap-5">
              <table className="w-fit flex flex-col gap-1 text-(--secondary) rounded-t-2xl sm:gap-2 sm:p-4 sm:pt-6 sm:text-lg">
                <thead>
                  <tr className="flex gap-1 sm:gap-5 md:gap-12 border-b">
                    <th className="w-15 text-center self-center">Posição</th>
                    <th className="w-35 text-center self-center">Nome</th>
                    <th className="w-15 text-center self-center">Pontos</th>
                    <th className="flex justify-center items-center w-35 relative">
                      <div className="absolute flex justify-between px-3 w-full -top-3 text-xs">
                        <div>
                          {currentMatch.group !== ""
                            ? "Grupo " + currentMatch.group
                            : ""}
                        </div>
                        <div>
                          {["1", "2", "3"].includes(currentMatch.round)
                            ? "Rodada " + currentMatch.round
                            : currentMatch.round}
                        </div>
                        {/* const ROUNDS = [ "1", "2", "3", "16 avos", "Oitavas", "Quartas", "Semi", "Terceiro lugar", "Final", ]; */}
                      </div>
                      <div
                        className={`flex w-fit h-fit items-center justify-center rotate-90 ${matchId !== 1 && "cursor-pointer"}`}
                        onClick={() => changeMatchId("decrease")}
                      >
                        <DownArrow
                          color={
                            matchId === 1
                              ? "var(--color-gray-500)"
                              : "var(--secondary)"
                          }
                        />
                      </div>
                      <div className="flex gap-1 w-full">
                        <div className="w-fit">
                          <span
                            className={`h-3 fi fi-${currentMatch.homeTeam.flagCode} relative top-1`}
                          ></span>
                          <div className="text-[11px] relative bottom-0.5">
                            {currentMatch.homeTeam.id}
                          </div>
                        </div>
                        <div className="self-center text-sm w-full">
                          {currentResult ? currentResult.homeGoals : "-"}
                        </div>
                        <div className="self-center text-xs w-2">x</div>
                        <div className="self-center text-sm w-full">
                          {currentResult ? currentResult.awayGoals : "-"}
                        </div>
                        <div className="w-fit">
                          <span
                            className={`h-3 fi fi-${currentMatch.awayTeam.flagCode} relative top-1`}
                          ></span>
                          <div className="text-[11px] relative bottom-0.5">
                            {currentMatch.awayTeam.id}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex w-fit h-fit items-center justify-center -rotate-90 ${matchId !== lastIndex + 1 && "cursor-pointer"}`}
                        onClick={() => changeMatchId("increase")}
                      >
                        <DownArrow
                          color={
                            matchId === lastIndex + 1
                              ? "var(--color-gray-500)"
                              : "var(--secondary)"
                          }
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <BodyRankingTable
                  users={users}
                  matchId={matchId}
                  result={currentResult}
                />
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface BodyRankingTableType {
  users: (UserGuessesType & { position: number })[];
  matchId: number;
  result: MatchIndexedDBType | null;
}

function BodyRankingTable({ users, matchId, result }: BodyRankingTableType) {
  const session = useSession();

  return (
    <tbody>
      {users.map((user) => {
        const guess = user.guesses.filter((guess) => guess.matchId === matchId);
        return (
          <tr
            key={user.userId}
            className={`flex gap-1 sm:gap-5 md:gap-12 border-b py-1 ${user.userId === session.data?.user.userId && "bg-(--secondary)/20"}`}
          >
            <td className="w-15 text-center self-center">{user.position}°</td>
            <td className="w-35 text-center self-center">{user.name}</td>
            <td className="w-15 text-center self-center">{user.points}</td>
            <td className="relative flex items-center justify-center w-35 text-center self-center">
              <div className="flex w-full px-9 justify-between text-sm">
                <div>
                  {(result || user.userId === session.data?.user.userId) &&
                  guess[0]
                    ? guess[0].homeGoals
                    : "-"}
                </div>
                <div>x</div>
                <div>
                  {(result || session.data?.user.userId === user.userId) &&
                  guess[0]
                    ? guess[0].awayGoals
                    : "-"}
                </div>
              </div>
              <div className="absolute right-1 w-fit shrink-0 text-xs text-green-600 font-bold">
                {result ? (guess[0] ? "+ " + guess[0].points : "+ 0") : ""}
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
