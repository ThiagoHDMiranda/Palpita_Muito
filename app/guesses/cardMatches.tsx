"use client";

import Button from "@/components/button";
import GROUP_MATCHES, { MatchType } from "@/constants/matches";
import STADIUMS_INFO from "@/constants/stadiums";
import AcceptSVG from "@/public/acceptIcon";
import CloseSVG from "@/public/closeIcon";
import EditSVG from "@/public/editIcon";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type GuessType = {
  homeGoals: number | "-" | "";
  awayGoals: number | "-" | "";
};

export default function CardMatches() {
  const [previusGuess, setPreviusGuess] = useState<GuessType>({
    homeGoals: "-",
    awayGoals: "-",
  });

  return (
    <div className="px-5 flex flex-col gap-5 w-full">
      {GROUP_MATCHES.map((match) => (
        <CardMatch
          key={match.id}
          match={match}
          previusGuess={previusGuess}
          setPreviusGuess={setPreviusGuess}
        />
      ))}
    </div>
  );
}

interface CardMatchProps {
  match: MatchType;
  previusGuess: GuessType;
  setPreviusGuess: Dispatch<SetStateAction<GuessType>>;
}

function CardMatch({ match, previusGuess, setPreviusGuess }: CardMatchProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<GuessType>({
    homeGoals: "-",
    awayGoals: "-",
  });
  const [isValidGuess, setIsValidGuess] = useState(false);

  function handleSaveButton(newValue: GuessType) {
    if (
      newValue.homeGoals === "" ||
      newValue.awayGoals === "" ||
      isNaN(Number(newValue.homeGoals)) ||
      isNaN(Number(newValue.awayGoals))
    ) {
      setIsValidGuess(false);
      return;
    }

    setIsValidGuess(true);
  }

  function cancelEdit() {
    setIsEditing(false);
    if (currentGuess.homeGoals === "" || currentGuess.awayGoals === "") {
      setCurrentGuess({
        homeGoals: "-",
        awayGoals: "-",
      });
      return;
    }

    setCurrentGuess(previusGuess);
  }

  function changeGuess() {
    if (isValidGuess) {
      setIsEditing(false);
    }
  }

  function editGuess() {
    const matchPreviusGuess: GuessType = {
      homeGoals: "-",
      awayGoals: "-",
    };

    if (currentGuess.homeGoals === "-" || currentGuess.awayGoals === "-") {
      setCurrentGuess({
        homeGoals: "",
        awayGoals: "",
      });
    } else {
      matchPreviusGuess.homeGoals = currentGuess.homeGoals;
      matchPreviusGuess.awayGoals = currentGuess.awayGoals;
    }

    setPreviusGuess(matchPreviusGuess);

    setIsEditing(true);
    handleSaveButton(currentGuess);
  }

  return (
    <div
      key={match.id}
      className="relative flex flex-col items-center justify-center p-3 shadow-xs shadow-amber-100/20 border border-(--primary)/50 rounded-xl"
    >
      <div className="w-full flex items-center justify-between">
        <span>Rodada {match.round}</span>
        <span className="self-end">Grupo {match.group}</span>
      </div>
      <div className="text-sm text-(--primary)">
        {new Date(match.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}{" "}
        - {match.time}
      </div>
      <WriteMatch
        isEditing={isEditing}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        match={match}
        handleSaveButton={(newValue: GuessType) => handleSaveButton(newValue)}
      />
      <div className="flex flex-col items-center justify-center text-xs">
        <span>{match.stadium}</span>
        <span className="text-neutral-500">
          {STADIUMS_INFO[match.stadium].city} -{" "}
          {STADIUMS_INFO[match.stadium].country}
        </span>
      </div>
      {isEditing ? (
        <div className="flex w-1/2 justify-around pt-2">
          <Button
            color="red"
            onClick={() => cancelEdit()}
            children={<ButtonCard children={<CloseSVG />} />}
            className="not-sm:px-1.5! not-sm:py-1.5"
          />

          <Button
            color={isValidGuess ? "green" : "gray"}
            onClick={() => changeGuess()}
            children={<ButtonCard children={<AcceptSVG />} />}
            className={`not-sm:px-1.5! not-sm:py-1.5 ${!isValidGuess && "cursor-default! hover:translate-none!"}`}
          />
        </div>
      ) : (
        <div
          className="absolute left-3 bottom-3 cursor-pointer"
          onClick={() => editGuess()}
        >
          <EditSVG />
        </div>
      )}
    </div>
  );
}

interface WriteMatchProps {
  isEditing: boolean;
  currentGuess: GuessType;
  setCurrentGuess: Dispatch<SetStateAction<GuessType>>;
  match: MatchType;
  handleSaveButton: (newValue: GuessType) => void;
}

function WriteMatch({
  isEditing,
  currentGuess,
  setCurrentGuess,
  match,
  handleSaveButton,
}: WriteMatchProps) {
  function onChangeGuess(
    inputValue: ChangeEvent<HTMLInputElement>,
    position: "homeGoals" | "awayGoals",
  ) {
    const value = inputValue.target.value.replace(/[^0-9]/g, "").slice(0, 2);
    const newGuess: GuessType = {
      homeGoals: currentGuess.homeGoals,
      awayGoals: currentGuess.awayGoals,
    };
    newGuess[position] = Number(value);

    setCurrentGuess(newGuess);
    handleSaveButton(newGuess);
  }

  return (
    <div className="flex items-center justify-center gap-2 w-full py-3">
      <div className="flex items-center justify-end w-1/2 gap-2 shrink-0">
        <span className="truncate max-w-4/6 pl-3">{match.homeTeam.label}</span>
        <span
          className={`fi fi-${match.homeTeam.flagCode} shrink-0 w-fit`}
        ></span>
        <input
          className={`flex items-center justify-center w-6 h-6 shrink-0 
                    ${isEditing && "border-2 border-neutral-500 bg-neutral-50/50"} rounded-md 
                    ${isEditing ? "text-(--secondary)" : "text-white"} text-center text-sm font-bold outline-none focus:outline-none`}
          value={currentGuess.homeGoals}
          readOnly={!isEditing}
          type="text"
          inputMode="numeric"
          maxLength={2}
          onChange={(inputValue) => onChangeGuess(inputValue, "homeGoals")}
        />
      </div>
      <div className="flex items-center justify-center w-1/12 text-center">
        x
      </div>
      <div className="flex items-center justify-start w-1/2 gap-2 shrink-0">
        <input
          className={`flex items-center justify-center w-6 h-6 shrink-0 
                  ${isEditing && "border-2 border-neutral-500 bg-neutral-50/50"} rounded-md 
                  ${isEditing ? "text-(--secondary)" : "text-white"} text-center text-sm font-bold outline-none focus:outline-none`}
          value={currentGuess.awayGoals}
          readOnly={!isEditing}
          type="text"
          inputMode="numeric"
          maxLength={2}
          onChange={(inputValue) => onChangeGuess(inputValue, "awayGoals")}
        />
        <span
          className={`fi fi-${match.awayTeam.flagCode} shrink-0 w-fit`}
        ></span>
        <span className="truncate max-w-4/6 pr-3">{match.awayTeam.label}</span>
      </div>
    </div>
  );
}

function ButtonCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {children} <span className="not-sm:hidden">Salvar</span>
    </div>
  );
}
