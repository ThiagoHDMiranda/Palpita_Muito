import GROUP_MATCHES, { GROUPS } from "@/constants/matches";
import { useState } from "react";
import CardMatch from "../../components/cardMatch";
import { RoundGroupChosenType } from "./cardData";

export type GuessType = {
  homeGoals: number | "-" | "";
  awayGoals: number | "-" | "";
};

interface GamesProps {
  groupChosen: (typeof GROUPS)[number];
  roundGroupChosen: RoundGroupChosenType;
}

export default function CardMatches({
  groupChosen,
  roundGroupChosen,
}: GamesProps) {
  const [previusGuess, setPreviusGuess] = useState<GuessType>({
    homeGoals: "-",
    awayGoals: "-",
  });

  const matches = GROUP_MATCHES.filter(
    (match) => match.group === groupChosen,
  ).filter((match) => match.round === roundGroupChosen.toString());

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {matches.map((match) => (
          <CardMatch
            key={match.id}
            match={match}
            previusGuess={previusGuess}
            setPreviusGuess={setPreviusGuess}
          />
        ))}
      </div>
    </div>
  );
}
