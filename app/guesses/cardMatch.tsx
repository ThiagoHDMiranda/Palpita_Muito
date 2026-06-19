import Button from "@/components/button";
import GROUP_MATCHES, { MatchType } from "@/constants/matches";
import STADIUMS_INFO from "@/constants/stadiums";
import AcceptSVG from "@/public/acceptIcon";
import CloseSVG from "@/public/closeIcon";
import EditSVG from "@/public/editIcon";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { GuessType } from "./cardMatches";
import { setGuess } from "@/server/actions/guess.action";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Match from "./match";
import { usePathname } from "next/navigation";
import { setMatchResult } from "@/server/actions/matchResult.action";

interface CardMatchProps {
  match: MatchType;
  previusGuess: GuessType;
  setPreviusGuess: Dispatch<SetStateAction<GuessType>>;
}

export default function CardMatch({
  match,
  previusGuess,
  setPreviusGuess,
}: CardMatchProps) {
  const pathname = usePathname();
  const session = useSession();
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

  async function changeGuess() {
    if (isValidGuess) {
      setIsEditing(false);
      const toastId = toast.loading("Salvando");

      if (pathname === "/results") {
        const result = await setMatchResult(
          match.id,
          Number(currentGuess.homeGoals),
          Number(currentGuess.awayGoals),
        );

        if (!result.success) {
          toast.error(result.message, { id: toastId });

          setCurrentGuess({
            homeGoals: previusGuess.homeGoals,
            awayGoals: previusGuess.awayGoals,
          });
          return;
        }
        toast.success("Salvo com sucesso", { id: toastId });
      }

      const result = await setGuess(
        match.id,
        Number(currentGuess.homeGoals),
        Number(currentGuess.awayGoals),
      );

      if (!result.success) {
        toast.error(result.message, { id: toastId });

        setCurrentGuess({
          homeGoals: previusGuess.homeGoals,
          awayGoals: previusGuess.awayGoals,
        });
        return;
      }

      toast.success("Salvo com sucesso", { id: toastId });
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
      <div className="text-sm text-(--primary) font-bold">
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
            children={<ButtonCard label="Cancelar" children={<CloseSVG />} />}
            className="not-sm:px-1.5! not-sm:py-1.5"
          />

          <Button
            color={isValidGuess ? "green" : "gray"}
            onClick={() => changeGuess()}
            children={<ButtonCard label="Salvar" children={<AcceptSVG />} />}
            className={`not-sm:px-1.5! not-sm:py-1.5 ${!isValidGuess && "cursor-default! hover:translate-none!"}`}
          />
        </div>
      ) : (
        <div>
          {((pathname === "/results" && session.data?.user.role === "ADMIN") ||
            GROUP_MATCHES[match.id - 1].datetime > new Date() ||
            session.data?.user.role === "ADMIN") && (
            <div
              className="absolute left-3 bottom-3 cursor-pointer"
              onClick={() => editGuess()}
            >
              <EditSVG />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ButtonCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {children} <span className="not-sm:hidden">{label}</span>
    </div>
  );
}
