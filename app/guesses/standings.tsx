import Button from "@/components/button";
import { GROUPS, MatchType } from "@/constants/matches";
import DownArrow from "@/public/downArrowIcon";
import { GuessIndexedDBType, MatchIndexedDBType } from "@/types/match";
import { Dispatch, SetStateAction, useState } from "react";
import StandingsTable from "./standingsTable";

interface StandingsProps {
  group: (typeof GROUPS)[number];
  matches: MatchType[];
  guesses: GuessIndexedDBType[];
  results: MatchIndexedDBType[];
}

export default function Standings({
  group,
  matches,
  guesses,
  results,
}: StandingsProps) {
  const [isMyStandings, setIsMyStandings] = useState(true);

  return (
    <div className="flex flex-col w-full max-w-111 sm:max-w-137 md:max-w-155 overflow-x-auto overflow-y-hidden self-center gap-4 bg-gray-300 rounded-xl mb-10 p-2 pt-4 scrollbar-thumb-(--secondary)">
      <SwitchStandings
        isMyStandings={isMyStandings}
        setIsMyStandings={setIsMyStandings}
      />
      <div className="w-full flex">
        <table className="w-fit flex flex-col gap-1 text-(--secondary) pt-4 rounded-t-2xl sm:gap-2 sm:p-4 sm:pt-6 sm:text-lg">
          <thead>
            <tr className="flex gap-1 sm:gap-3 md:gap-5 border-b">
              <th className="relative -top-2 w-27 sm:w-29 md:w-31 flex justify-center">
                <span className="bg-(--secondary) rounded-full font-black h-8 w-8 flex items-center justify-center text-gray-300">
                  {group}
                </span>
              </th>
              <th className="w-6">P</th>
              <th className="w-6">V</th>
              <th className="w-6">E</th>
              <th className="w-6">D</th>
              <th className="w-8">GP</th>
              <th className="w-8">GC</th>
              <th className="w-8">SG</th>
              <th className="w-24 text-nowrap px-1">Últ. Jogos</th>
            </tr>
          </thead>
          <StandingsTable
            isMyStandings={isMyStandings}
            group={group}
            matches={matches}
            guesses={guesses}
            results={results}
          />
        </table>
      </div>
    </div>
  );
}

interface SwitchStandingsProps {
  isMyStandings: boolean;
  setIsMyStandings: Dispatch<SetStateAction<boolean>>;
}

function SwitchStandings({
  isMyStandings,
  setIsMyStandings,
}: SwitchStandingsProps) {
  return (
    <div className="w-full flex justify-center gap-3 text-sm">
      <Button
        className={`${
          isMyStandings
            ? "bg-(--secondary) border-(--secondary) text-gray-300 shadow-green-800/80"
            : "bg-gray-500 border-gray-500 text-(--secondary) shadow-gray-500/80"
        }
           duration-200 shadow-xs hover:shadow-md`}
        color="custom"
        onClick={() => setIsMyStandings(true)}
      >
        Tabela palpite
      </Button>
      <div
        className={`flex items-center justify-center duration-200 ${isMyStandings ? "rotate-90" : "-rotate-90"}`}
      >
        <DownArrow color="var(--secondary)" />
      </div>
      <Button
        className={`${
          !isMyStandings
            ? "bg-(--secondary) border-(--secondary) text-gray-300 shadow-green-800/80"
            : "bg-gray-500 border-gray-500 text-(--secondary) shadow-gray-500/80"
        }
           duration-200 shadow-xs hover:shadow-md`}
        color="custom"
        onClick={() => setIsMyStandings(false)}
      >
        Tabela resultado
      </Button>
    </div>
  );
}
