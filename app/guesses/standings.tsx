import Button from "@/components/button";
import GROUP_MATCHES, { GROUPS } from "@/constants/matches";
import TEAMS, { TeamType } from "@/constants/teams";
import DotSVG from "@/public/dotIcon";
import DownArrow from "@/public/downArrowIcon";
import { useState } from "react";

interface GroupTeamsType extends TeamType {
  points?: number;
  wins?: number;
  draws?: number;
  loss?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalsDifference?: number;
}

export default function Standings({
  group,
}: {
  group: (typeof GROUPS)[number];
}) {
  const [isMyStandings, setIsMyStandings] = useState(true);

  const groupTeams: GroupTeamsType[] = Object.values(TEAMS).filter(
    (team) => team.group === group,
  );
  groupTeams.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col w-full max-w-111 sm:max-w-117 overflow-x-auto overflow-y-hidden self-center gap-4 bg-gray-300 rounded-xl mb-10 p-2 pt-4 scrollbar-thumb-(--secondary)">
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
          Meus resultados
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
          Resultados reais
        </Button>
      </div>
      <div className="w-full flex ">
        <table className="w-fit flex flex-col gap-1 text-(--secondary) pt-4 rounded-t-2xl sm:gap-2 sm:p-4 sm:pt-6 sm:text-lg">
          <thead>
            <tr className="flex gap-1">
              <th className="w-27 text-start">GRUPO {group}</th>
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
          <tbody>
            {groupTeams.map((team, index) => {
              const lastMatches = GROUP_MATCHES.filter(
                (item) => item.homeTeam === team || item.awayTeam === team,
              );

              // const resultLastMatches = lastMatches.map((match)=> {

              //   }})

              return (
                <tr key={team.name} className="flex gap-1">
                  <th className="w-6">{index + 1}</th>
                  <th className="flex gap-2 w-20">
                    <span
                      className={`fi fi-${team.flagCode} flex self-center shrink-0 border border-gray-300 h-fit`}
                    ></span>
                    <span className="w-full">{team.id}</span>
                  </th>
                  <th className="w-6">{team.points ?? 0}</th>
                  <th className="w-6">{team.points ?? 0}</th>
                  <th className="w-6">{team.points ?? 0}</th>
                  <th className="w-6">{team.points ?? 0}</th>
                  <th className="w-8">{team.points ?? 0}</th>
                  <th className="w-8">{team.points ?? 0}</th>
                  <th className="w-8">{team.points ?? 0}</th>
                  <th className="w-24 flex items-center justify-center gap-2">
                    <DotSVG color={lastMatches && "transparent"} />
                    <DotSVG color={lastMatches && "transparent"} />
                    <DotSVG color={lastMatches && "transparent"} />
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
