import { GROUPS, MatchType } from "@/constants/matches";
import TEAMS, { TeamType } from "@/constants/teams";
import DotSVG from "@/public/dotIcon";
import { GuessIndexedDBType, MatchIndexedDBType } from "@/types/match";

type LastMatchesObject = {
  against: TeamType;
  result: "w" | "d" | "l" | null;
} | null;

type GroupTeamsType = TeamType & {
  points: number;
  wins: number;
  draws: number;
  loss: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  lastMatches: LastMatchesObject[];
};

interface StandingsTableProps {
  isMyStandings: boolean;
  group: (typeof GROUPS)[number];
  matches: MatchType[];
  guesses: GuessIndexedDBType[];
  results: MatchIndexedDBType[];
}

export default function StandingsTable({
  isMyStandings,
  group,
  matches,
  guesses,
  results,
}: StandingsTableProps) {
  const groupTeams: GroupTeamsType[] = Object.values(TEAMS)
    .filter((team) => team.group === group)
    .map((team) => ({
      ...team,
      points: 0,
      wins: 0,
      draws: 0,
      loss: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      lastMatches: [null, null, null],
    }));

  function setGoals(
    team: GroupTeamsType,
    guessGoalsFor: number,
    guessGoalsAgainst: number,
  ) {
    team.goalsFor += guessGoalsFor;
    team.goalsAgainst += guessGoalsAgainst;
    team.goalDifference = team.goalsFor - team.goalsAgainst;
  }

  function setVictory(
    winner: GroupTeamsType,
    loser: GroupTeamsType,
    index: number,
    winnerObject: TeamType,
    loserObject: TeamType,
  ) {
    winner.wins++;
    winner.lastMatches[index] = {
      against: loserObject,
      result: "w",
    };
    winner.points += 3;

    loser.loss++;
    loser.lastMatches[index] = {
      against: winnerObject,
      result: "l",
    };
  }

  function writeDraw(
    team: GroupTeamsType,
    index: number,
    teamObject: TeamType,
  ) {
    team.draws++;
    team.lastMatches[index] = {
      against: teamObject,
      result: "d",
    };
    team.points++;
  }

  function setDraw(
    firstTeam: GroupTeamsType,
    secondTeam: GroupTeamsType,
    index: number,
    firstTeamObject: TeamType,
    secondTeamObject: TeamType,
  ) {
    writeDraw(firstTeam, index, secondTeamObject);
    writeDraw(secondTeam, index, firstTeamObject);
  }

  function getResults(matchId: number) {
    if (isMyStandings) {
      return guesses.find((guess) => guess.matchId === matchId);
    }
    return results.find((result) => result.matchId === matchId);
  }

  matches.map((match) => {
    const homeTeam = groupTeams.find((team) => team.id === match.homeTeam.id);
    const awayTeam = groupTeams.find((team) => team.id === match.awayTeam.id);

    if (!homeTeam || !awayTeam) {
      return;
    }

    const matchRound = Number(match.round) ?? null;
    const indexMatchRound = matchRound - 1;

    homeTeam.lastMatches[indexMatchRound] = {
      against: match.awayTeam,
      result: null,
    };

    awayTeam.lastMatches[indexMatchRound] = {
      against: match.homeTeam,
      result: null,
    };

    const matchResult = getResults(match.id);
    if (!matchResult) {
      return;
    }

    setGoals(homeTeam, matchResult.homeGoals, matchResult.awayGoals);
    setGoals(awayTeam, matchResult.awayGoals, matchResult.homeGoals);

    const winner =
      matchResult.homeGoals > matchResult.awayGoals
        ? "home"
        : matchResult.homeGoals === matchResult.awayGoals
          ? "draw"
          : "away";

    switch (winner) {
      case "home":
        setVictory(
          homeTeam,
          awayTeam,
          indexMatchRound,
          match.homeTeam,
          match.awayTeam,
        );
        break;
      case "away":
        setVictory(
          awayTeam,
          homeTeam,
          indexMatchRound,
          match.awayTeam,
          match.homeTeam,
        );
        break;
      case "draw":
        setDraw(
          homeTeam,
          awayTeam,
          indexMatchRound,
          match.homeTeam,
          match.awayTeam,
        );
        break;
    }
  });

  groupTeams.sort((a, b) => a.name.localeCompare(b.name));
  groupTeams.sort((a, b) => b.goalsFor - a.goalsFor);
  groupTeams.sort((a, b) => b.goalDifference - a.goalDifference);
  groupTeams.sort((a, b) => b.points - a.points);

  function setColorLastMatches(match: LastMatchesObject[], position: number) {
    return !match[position]
      ? "transparent"
      : match[position].result === "w"
        ? "var(--color-green-500)"
        : match[position].result === "l"
          ? "var(--color-red-500)"
          : match[position].result === "d"
            ? "var(--color-gray-500)"
            : "trasnparent";
  }

  return (
    <tbody>
      {groupTeams.map((team, index) => {
        const lastMatchesColors: string[] = ["", "", ""];
        lastMatchesColors[0] = setColorLastMatches(team.lastMatches, 0);
        lastMatchesColors[1] = setColorLastMatches(team.lastMatches, 1);
        lastMatchesColors[2] = setColorLastMatches(team.lastMatches, 2);

        return (
          <tr
            key={team.name}
            className="flex gap-1 sm:gap-3 md:gap-5 border-b py-1"
          >
            <th className="w-6 self-center">{index + 1}</th>
            <th className="flex gap-2 w-20 self-center">
              <span
                className={`fi fi-${team.flagCode} flex self-center shrink-0 border border-gray-300 h-fit`}
              ></span>
              <span className="w-full">{team.id}</span>
            </th>
            <th className="w-6 self-center">{team.points}</th>
            <th className="w-6 self-center">{team.wins}</th>
            <th className="w-6 self-center">{team.draws}</th>
            <th className="w-6 self-center">{team.loss}</th>
            <th className="w-8 self-center">{team.goalsFor}</th>
            <th className="w-8 self-center">{team.goalsAgainst}</th>
            <th className="w-8 self-center">{team.goalDifference}</th>
            <th className="w-24 flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {team.lastMatches.map((match, index) => (
                  <div key={index}>
                    {match && (
                      <div className="flex gap-1 flex-col items-center justify-center">
                        <DotSVG color={lastMatchesColors[index]} />
                        <span
                          className={`h-3 fi fi-${match.against.flagCode} flex self-center shrink-0 border border-gray-300`}
                        ></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </th>
          </tr>
        );
      })}
    </tbody>
  );
}
