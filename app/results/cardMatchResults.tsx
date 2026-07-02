"use client";

import GROUP_MATCHES from "@/constants/matches";
import { useEffect, useState } from "react";
import CardMatch from "../../components/cardMatch";
import { getAllResultsIndexedDB } from "@/server/indexedDB";
import { GuessType, MatchIndexedDBType } from "@/types/match";

export default function CardMatchResults() {
  const [previusGuess, setPreviusGuess] = useState<GuessType>({
    homeGoals: "-",
    awayGoals: "-",
    extraTime: false,
    homeETGoals: null,
    awayETGoals: null,
    homePenalties: null,
    awayPenalties: null,
    points: 0,
  });
  const [results, setResults] = useState<MatchIndexedDBType[]>([]);
  const [changeData, setChangeData] = useState(0);

  const lastResult = results[results.length - 1];

  async function loadResults() {
    const getResuls = await getAllResultsIndexedDB();
    if (!getResuls) return;

    setResults(getResuls);
  }

  useEffect(() => {
    loadResults();
  }, [changeData]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 mb-20 sm:mb-10">
        {GROUP_MATCHES.map((match) => {
          const result = results.filter(
            (result) => result.matchId === match.id,
          );
          return (
            <div key={match.id}>
              <CardMatch
                lastResult={lastResult}
                match={match}
                previusGuess={previusGuess}
                setPreviusGuess={setPreviusGuess}
                guess={result[0] ?? null}
                setChangeData={setChangeData}
                result={null}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
