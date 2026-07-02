import { MatchType } from "@/constants/matches";
import { Dispatch, SetStateAction, useState } from "react";
import CardMatch from "../../components/cardMatch";
import {
  GuessIndexedDBType,
  GuessType,
  MatchIndexedDBType,
} from "@/types/match";

interface CardMatchesProps {
  matches: MatchType[];
  guesses: GuessIndexedDBType[];
  setChangeData: Dispatch<SetStateAction<number>>;
  results: MatchIndexedDBType[];
}

export default function CardMatches({
  matches,
  guesses,
  setChangeData,
  results,
}: CardMatchesProps) {
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {matches.map((match) => {
          const guessMatch = guesses.filter(
            (guess) => guess.matchId === match.id,
          );

          const resultMatch = results.filter(
            (result) => result.matchId === match.id,
          );

          const guessMatchProperties = guessMatch[0]
            ? {
                ...guessMatch[0],
                extraTime: false,
                homeETGoals: null,
                awayETGoals: null,
                homePenalties: null,
                awayPenalties: null,
              }
            : null;

          return (
            <div key={match.id}>
              <CardMatch
                match={match}
                previusGuess={previusGuess}
                setPreviusGuess={setPreviusGuess}
                guess={guessMatchProperties}
                setChangeData={setChangeData}
                result={resultMatch[0] ?? null}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
