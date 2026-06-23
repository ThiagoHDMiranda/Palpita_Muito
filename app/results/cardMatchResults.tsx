"use client";

import Button from "@/components/button";
import GROUP_MATCHES, { MatchType } from "@/constants/matches";
import STADIUMS_INFO from "@/constants/stadiums";
import AcceptSVG from "@/public/acceptIcon";
import CloseSVG from "@/public/closeIcon";
import EditSVG from "@/public/editIcon";
import { useSession } from "next-auth/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import CardMatch from "../../components/cardMatch";

type GuessType = {
  homeGoals: number | "-" | "";
  awayGoals: number | "-" | "";
};

export default function CardMatchResults() {
  const [previusGuess, setPreviusGuess] = useState<GuessType>({
    homeGoals: "-",
    awayGoals: "-",
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        {GROUP_MATCHES.map((match) => (
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
