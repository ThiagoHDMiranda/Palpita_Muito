import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { GuessType } from "../app/guesses/cardMatches";
import { MatchType } from "@/constants/matches";

interface MatchProps {
  isEditing: boolean;
  currentGuess: GuessType;
  setCurrentGuess: Dispatch<SetStateAction<GuessType>>;
  match: MatchType;
  handleSaveButton: (newValue: GuessType) => void;
}

export default function Match({
  isEditing,
  currentGuess,
  setCurrentGuess,
  match,
  handleSaveButton,
}: MatchProps) {
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
                    ${isEditing ? "text-(--secondary)" : "text-gray-300"} text-center text-sm font-bold outline-none focus:outline-none`}
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
                  ${isEditing ? "text-(--secondary)" : "text-gray-300"} text-center text-sm font-bold outline-none focus:outline-none`}
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
