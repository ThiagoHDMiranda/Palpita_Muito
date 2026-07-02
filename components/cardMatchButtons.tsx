import GROUP_MATCHES, { MatchType } from "@/constants/matches";
import AcceptSVG from "@/public/acceptIcon";
import CloseSVG from "@/public/closeIcon";
import EditSVG from "@/public/editIcon";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Button from "./button";
import toast from "react-hot-toast";
import { saveGuessFromUserIndexedDB } from "@/server/indexedDB";
import {
  setGuessPoints,
  setMatchResult,
} from "@/server/actions/matchResult.action";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { GuessType, MatchIndexedDBType } from "@/types/match";
import CalculatorSVG from "@/public/calculatorIcon";

interface CardMatchButtonsProps {
  pathname: string;
  match: MatchType;
  previusGuess: GuessType;
  setPreviusGuess: Dispatch<SetStateAction<GuessType>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  currentGuess: GuessType;
  setCurrentGuess: Dispatch<SetStateAction<GuessType>>;
  isValidGuess: boolean;
  handleSaveButton: (newValue: GuessType) => void;
  setChangeData: Dispatch<SetStateAction<number>>;
  result: MatchIndexedDBType | null;
}

export default function CardMatchButtons({
  pathname,
  match,
  previusGuess,
  setPreviusGuess,
  isEditing,
  setIsEditing,
  currentGuess,
  setCurrentGuess,
  isValidGuess,
  handleSaveButton,
  setChangeData,
  result,
}: CardMatchButtonsProps) {
  const session = useSession();

  const defaultGuess: GuessType = {
    homeGoals: "-",
    awayGoals: "-",
    extraTime: false,
    homeETGoals: null,
    awayETGoals: null,
    homePenalties: null,
    awayPenalties: null,
    points: 0,
  };

  function cancelEdit() {
    setIsEditing(false);
    if (currentGuess.homeGoals === "" || currentGuess.awayGoals === "") {
      setCurrentGuess(defaultGuess);
      return;
    }

    setCurrentGuess(previusGuess);
  }

  async function changeMatch() {
    if (isValidGuess) {
      setIsEditing(false);
      const toastId = toast.loading("Salvando");

      const resultRequest = await setMatch();

      if (!resultRequest.success) {
        toast.error(resultRequest.message, { id: toastId });

        setCurrentGuess(previusGuess);
        return;
      }
      toast.success("Salvo com sucesso", { id: toastId });
      setChangeData((prev) => ++prev);
    }
  }

  async function setMatch() {
    if (pathname === "/results") {
      let homeETGoals = null;
      let awayETGoals = null;
      let homePenalties = null;
      let awayPenalties = null;

      if (currentGuess.homeGoals === currentGuess.awayGoals) {
        homeETGoals = currentGuess.homeETGoals;
        awayETGoals = currentGuess.awayETGoals;
      }

      if (
        currentGuess.homeGoals === currentGuess.awayGoals &&
        currentGuess.homeETGoals === currentGuess.awayETGoals
      ) {
        homePenalties = currentGuess.homePenalties;
        awayPenalties = currentGuess.awayPenalties;
      }

      const resultRequest = await setMatchResult(
        match.id,
        Number(currentGuess.homeGoals),
        Number(currentGuess.awayGoals),
        currentGuess.extraTime,
        homeETGoals,
        awayETGoals,
        homePenalties,
        awayPenalties,
      );

      return resultRequest;
    }
    const resultRequest = await saveGuessFromUserIndexedDB({
      matchId: match.id,
      homeGoals: Number(currentGuess.homeGoals),
      awayGoals: Number(currentGuess.awayGoals),
      points: Number(currentGuess.points),
    });

    return resultRequest;
  }

  function editGuess() {
    const matchPreviusGuess: GuessType = defaultGuess;

    if (currentGuess.homeGoals === "-" || currentGuess.awayGoals === "-") {
      setCurrentGuess({
        homeGoals: "",
        awayGoals: "",
        extraTime: false,
        homeETGoals: null,
        awayETGoals: null,
        homePenalties: null,
        awayPenalties: null,
        points: 0,
      });
    } else {
      matchPreviusGuess.homeGoals = currentGuess.homeGoals;
      matchPreviusGuess.awayGoals = currentGuess.awayGoals;
    }

    setPreviusGuess(matchPreviusGuess);

    setIsEditing(true);
    handleSaveButton(currentGuess);
  }

  async function calculatePoints() {
    const toastId = toast.loading("Salvando");

    if (
      !currentGuess ||
      currentGuess.homeGoals === "" ||
      currentGuess.homeGoals === "-" ||
      currentGuess.awayGoals === "" ||
      currentGuess.awayGoals === "-"
    ) {
      toast.error("Resultado não definido", { id: toastId });
      return;
    }
    const result = await setGuessPoints(match.id, {
      homeGoals: currentGuess.homeGoals,
      awayGoals: currentGuess.awayGoals,
    });

    if (!result.success) toast.error(result.message, { id: toastId });

    toast.success("Salvo com sucesso", { id: toastId });
  }

  return (
    <div className="w-full flex justify-center">
      {isEditing ? (
        <div className="flex w-1/2 justify-around pt-2">
          <Button
            color="red"
            onClick={() => cancelEdit()}
            children={<ButtonCard label="Cancelar" children={<CloseSVG />} />}
            className="not-sm:px-1.5! not-sm:py-1.5"
          />
          <Button
            color={isValidGuess ? "green" : "gray"}
            onClick={() => changeMatch()}
            children={<ButtonCard label="Salvar" children={<AcceptSVG />} />}
            className={`not-sm:px-1.5! not-sm:py-1.5 ${!isValidGuess && "cursor-default! hover:translate-none!"}`}
          />
        </div>
      ) : (
        <div className="w-full">
          {pathname === "/results" ? (
            <EditMatchButtonResults
              match={match}
              session={session.data}
              editGuess={editGuess}
              calculatePoints={calculatePoints}
            />
          ) : (
            <EditMatchButtonGuesses
              match={match}
              session={session.data}
              editGuess={editGuess}
            />
          )}
        </div>
      )}
    </div>
  );
}

interface EditMatchButtonProps {
  match: MatchType;
  editGuess: () => void;
  session: Session | null;
}

export function EditMatchButtonResults({
  editGuess,
  session,
  calculatePoints,
}: EditMatchButtonProps & { calculatePoints: () => void }) {
  if (session?.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="w-full relative bottom-6">
      <div
        className="absolute left-0 cursor-pointer"
        onClick={() => editGuess()}
      >
        <EditSVG />
      </div>
      <div
        className="absolute right-0 cursor-pointer"
        onClick={() => calculatePoints()}
      >
        <CalculatorSVG />
      </div>
    </div>
  );
}

export function EditMatchButtonGuesses({
  match,
  editGuess,
  session,
}: EditMatchButtonProps) {
  if (
    GROUP_MATCHES[match.id - 1].datetime <= new Date() &&
    session?.user.role !== "ADMIN"
  ) {
    return null;
  }

  return (
    <div
      className="absolute left-3 bottom-3 cursor-pointer"
      onClick={() => editGuess()}
    >
      <EditSVG />
    </div>
  );
}

function ButtonCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {children} <span className="not-sm:hidden">{label}</span>
    </div>
  );
}
