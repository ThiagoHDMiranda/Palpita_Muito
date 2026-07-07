import { ChangeEvent, Dispatch, SetStateAction } from "react";
// import { GuessType } from "../app/guesses/cardMatches";
import { MatchType } from "@/constants/matches";
import { GuessType } from "@/types/match";

interface MatchProps {
  pathname: string;
  isEditing: boolean;
  currentGuess: GuessType;
  setCurrentGuess: Dispatch<SetStateAction<GuessType>>;
  match: MatchType;
  handleSaveButton: (newValue: GuessType) => void;
}

export default function Match({
  pathname,
  isEditing,
  currentGuess,
  setCurrentGuess,
  match,
  handleSaveButton,
}: MatchProps) {
  function onChangeGuess(
    inputValue: ChangeEvent<HTMLInputElement>,
    position:
      | "homeGoals"
      | "awayGoals"
      | "homeETGoals"
      | "awayETGoals"
      | "homePenalties"
      | "awayPenalties",
  ) {
    const value = inputValue.target.value.replace(/[^0-9]/g, "").slice(0, 2);
    const newGuess: GuessType = {
      homeGoals: currentGuess.homeGoals,
      awayGoals: currentGuess.awayGoals,
      extraTime: currentGuess.extraTime,
      homeETGoals: currentGuess.homeETGoals,
      awayETGoals: currentGuess.awayETGoals,
      homePenalties: currentGuess.homePenalties,
      awayPenalties: currentGuess.awayPenalties,
      points: currentGuess.points,
    };
    newGuess[position] = Number(value);

    setCurrentGuess(newGuess);
    handleSaveButton(newGuess);
  }

  function changeExtraTime(value: boolean) {
    setCurrentGuess({ ...currentGuess, extraTime: value });
  }

  return (
    <div className="flex items-center justify-center gap-2 w-full py-3 relative">
      <div
        className={`flex items-center justify-end w-1/2 gap-2 shrink-0 relative ${currentGuess.homePenalties && `before:absolute before:right-0 before:top-0 before:text-[10px] before:content-[${currentGuess.homePenalties}]`}`}
      >
        <span className="truncate max-w-4/6 pl-3">{match.homeTeam.label}</span>
        <span
          className={`fi fi-${match.homeTeam.flagCode} shrink-0 w-fit`}
        ></span>
        <div>
          <input
            className={`flex items-center justify-center w-6 h-6 shrink-0 
            ${isEditing && "border-2 border-neutral-500 bg-neutral-50/50"} rounded-md 
            ${isEditing ? "text-(--secondary)" : "text-gray-300"} text-center text-sm font-bold outline-none focus:outline-none`}
            value={
              currentGuess.homeGoals && currentGuess.homeETGoals
                ? Number(currentGuess.homeGoals) +
                  Number(currentGuess.homeETGoals)
                : currentGuess.homeGoals
            }
            readOnly={!isEditing}
            type="text"
            inputMode="numeric"
            maxLength={2}
            onChange={(inputValue) => onChangeGuess(inputValue, "homeGoals")}
          />
          {pathname === "/results" &&
            currentGuess.homeGoals !== "" &&
            currentGuess.awayGoals !== "" &&
            currentGuess.homeGoals === currentGuess.awayGoals && (
              <div>
                {currentGuess.homeETGoals === currentGuess.awayETGoals && (
                  <input
                    className={`flex items-center justify-center w-4 h-4 shrink-0 absolute 
                    ${isEditing && "border-2 border-neutral-500 bg-neutral-50/50"} rounded-md 
                    ${isEditing ? "text-(--secondary) -bottom-3 -right-2" : "text-gray-300 -top-1 -right-1.5"} text-center text-[10px] font-bold outline-none focus:outline-none`}
                    value={currentGuess.homePenalties ?? ""}
                    readOnly={!isEditing}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    onChange={(inputValue) =>
                      onChangeGuess(inputValue, "homePenalties")
                    }
                  />
                )}
                <input
                  className={`flex items-center justify-center w-4 h-4 shrink-0 absolute -top-4
                    ${isEditing && "border-2 border-neutral-500 bg-neutral-50/50"} rounded-md 
                  ${isEditing ? "text-(--secondary) right-2" : "hidden"} text-center text-[10px] font-bold outline-none focus:outline-none`}
                  value={currentGuess.homeETGoals ?? ""}
                  readOnly={!isEditing}
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  onChange={(inputValue) =>
                    onChangeGuess(inputValue, "homeETGoals")
                  }
                />
              </div>
            )}
        </div>
      </div>
      <div className="flex items-center justify-center w-1/12 text-center text-sm">
        x
      </div>
      <div
        className={`flex items-center justify-start w-1/2 gap-2 shrink-0 relative ${currentGuess.awayPenalties && `before:absolute before:right-0 before:top-0 before:text-[10px] before:content-[${currentGuess.awayPenalties}]`}`}
      >
        <div>
          <input
            className={`flex items-center justify-center w-6 h-6 shrink-0
              ${isEditing && "border-2 border-neutral-500 bg-neutral-50/50"} rounded-md 
              ${isEditing ? "text-(--secondary)" : "text-gray-300"} text-center text-sm font-bold outline-none focus:outline-none`}
            value={
              currentGuess.awayGoals && currentGuess.awayETGoals
                ? Number(currentGuess.awayGoals) +
                  Number(currentGuess.awayETGoals)
                : currentGuess.awayGoals
            }
            readOnly={!isEditing}
            type="text"
            inputMode="numeric"
            maxLength={2}
            onChange={(inputValue) => onChangeGuess(inputValue, "awayGoals")}
          />
          {pathname === "/results" &&
            currentGuess.homeGoals !== "" &&
            currentGuess.awayGoals !== "" &&
            currentGuess.homeGoals === currentGuess.awayGoals && (
              <div>
                {currentGuess.homeETGoals === currentGuess.awayETGoals && (
                  <input
                    className={`flex items-center justify-center w-4 h-4 shrink-0 absolute 
                    ${isEditing && "border-2 border-neutral-500 bg-neutral-50/50"} rounded-md 
                    ${isEditing ? "text-(--secondary) -bottom-3 -left-2" : "text-gray-300 -top-1 -left-1.5"} text-center text-[10px] font-bold outline-none focus:outline-none`}
                    value={currentGuess.awayPenalties ?? ""}
                    readOnly={!isEditing}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    onChange={(inputValue) =>
                      onChangeGuess(inputValue, "awayPenalties")
                    }
                  />
                )}
                <input
                  className={`flex items-center justify-center w-4 h-4 shrink-0 absolute -top-4
                    ${isEditing && "border-2 border-neutral-500 bg-neutral-50/50"} rounded-md 
                    ${isEditing ? "text-(--secondary) left-2" : "hidden"} text-center text-[10px] font-bold outline-none focus:outline-none`}
                  value={currentGuess.awayETGoals ?? ""}
                  readOnly={!isEditing}
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  onChange={(inputValue) =>
                    onChangeGuess(inputValue, "awayETGoals")
                  }
                />
              </div>
            )}
        </div>
        <span
          className={`fi fi-${match.awayTeam.flagCode} shrink-0 w-fit`}
        ></span>
        <span className="truncate max-w-4/6 pr-3">{match.awayTeam.label}</span>
      </div>
      {pathname === "/results" && (currentGuess.extraTime || isEditing) && (
        <div
          className={`absolute w-10 flex items-center text-gray-300 justify-center text-xs ${isEditing ? "-top-1" : "top-0"}`}
        >
          <span className="overflow-visible text-nowrap">
            {isEditing ? "P" : "Pós Prorrogação"}
          </span>
          {isEditing && (
            <input
              className="absolute right-0 w-3 h-3"
              type="checkbox"
              checked={currentGuess.extraTime}
              onChange={() => changeExtraTime(!currentGuess.extraTime)}
            />
          )}
        </div>
      )}
    </div>
  );
}
