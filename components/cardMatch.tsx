import { MatchType } from "@/constants/matches";
import STADIUMS_INFO from "@/constants/stadiums";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Match from "./match";
import { GuessType, MatchIndexedDBType } from "@/types/match";
import CardMatchButtons from "./cardMatchButtons";
import { usePathname } from "next/navigation";

interface CardMatchProps {
  lastResult?: MatchIndexedDBType;
  match: MatchType;
  previusGuess: GuessType;
  setPreviusGuess: Dispatch<SetStateAction<GuessType>>;
  guess: MatchIndexedDBType | null;
  setChangeData: Dispatch<SetStateAction<number>>;
  result: MatchIndexedDBType | null;
}

export default function CardMatch({
  lastResult,
  match,
  previusGuess,
  setPreviusGuess,
  guess,
  setChangeData,
  result,
}: CardMatchProps) {
  const pathname = usePathname();
  const [isEditing, setIsEditing] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<GuessType>({
    homeGoals: "-",
    awayGoals: "-",
    extraTime: false,
    homeETGoals: null,
    awayETGoals: null,
    homePenalties: null,
    awayPenalties: null,
    points: 0,
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

  useEffect(() => {
    if (!guess) return;
    setCurrentGuess({
      homeGoals: guess.homeGoals,
      awayGoals: guess.awayGoals,
      extraTime: guess.extraTime,
      homeETGoals: guess.homeETGoals,
      awayETGoals: guess.awayETGoals,
      homePenalties: guess.homePenalties,
      awayPenalties: guess.awayPenalties,
      points: guess.points,
    });
  }, [guess]);

  const id =
    lastResult && guess
      ? lastResult.matchId === guess.matchId
        ? "scrollTo"
        : ""
      : "";

  useLayoutEffect(() => {
    if (!id) {
      return;
    }
    const el = document.getElementById("scrollTo");
    if (!el) {
      return;
    }

    el.scrollIntoView({
      behavior: "smooth",
    });
  }, [id]);

  return (
    <div
      id={id}
      className="relative flex flex-col items-center justify-center p-3 shadow-xs shadow-amber-100/20 border border-(--primary-60) rounded-xl scroll-mt-23 sm:scroll-mt-46"
    >
      <div className="w-full flex items-center justify-between">
        <span>
          {["1", "2", "3"].includes(match.round)
            ? "Rodada " + match.round
            : match.round}
        </span>
        {["1", "2", "3"].includes(match.round) && (
          <span className="self-end">Grupo {match.group}</span>
        )}
      </div>
      <div className="text-sm text-(--primary-60) font-bold">
        {match.datetime
          .toLocaleTimeString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", " -")}
      </div>
      <Match
        pathname={pathname}
        isEditing={isEditing}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        match={match}
        handleSaveButton={(newValue: GuessType) => handleSaveButton(newValue)}
      />
      {pathname === "/guesses" && (
        <Result result={result} currentGuess={currentGuess} />
      )}
      <div className="flex flex-col items-center justify-center text-xs">
        <span>{match.stadium}</span>
        <span className="text-neutral-500">
          {STADIUMS_INFO[match.stadium].city} -{" "}
          {STADIUMS_INFO[match.stadium].country}
        </span>
      </div>
      <CardMatchButtons
        pathname={pathname}
        match={match}
        previusGuess={previusGuess}
        setPreviusGuess={setPreviusGuess}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        isValidGuess={isValidGuess}
        handleSaveButton={handleSaveButton}
        setChangeData={setChangeData}
        result={result}
      />
    </div>
  );
}

interface ResultProps {
  result: MatchIndexedDBType | null;
  currentGuess: GuessType | null;
}

function Result({ result, currentGuess }: ResultProps) {
  return (
    <div className="w-full grid grid-cols-3 mb-3 ">
      {result && (
        <span
          className={`col-start-1 text-center self-center text-green-400 text-xs font-bold`}
        >
          {currentGuess?.points === 1
            ? "+ " + currentGuess.points + " pt"
            : "+ " + currentGuess?.points + " pts"}
        </span>
      )}
      <div className="col-start-2 flex gap-2 justify-center text-(--secondary) bg-gray-300 font-bold rounded-2xl relative">
        <span className="w-6 h-6 text-center relative">
          {result ? result.homeGoals : "-"}
        </span>
        <span>x</span>
        <span className="w-6 h-6 text-center relative">
          {result ? result.awayGoals : "-"}
        </span>
      </div>
      <div className="col-start-3 text-center self-center text-(--primary-60) text-sm font-bold">
        {result ? "Finalizado" : ""}
      </div>
    </div>
  );
}
