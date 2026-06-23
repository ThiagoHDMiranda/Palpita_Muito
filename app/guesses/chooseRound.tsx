import Button from "@/components/button";
import DownArrow from "@/public/downArrowIcon";
import { RoundGroupChosenType } from "./cardData";

interface ChooseRoundProps {
  roundGroupChosen: RoundGroupChosenType;
  changeRound: (
    currentRound: RoundGroupChosenType,
    changeTo: "previous" | "next",
  ) => void;
}

export default function ChooseRound({
  roundGroupChosen,
  changeRound,
}: ChooseRoundProps) {
  return (
    <div className="w-full flex items-center justify-between bg-gray-300 rounded-2xl text-(--primary-60) text-sm font-bold">
      <Button
        className={`${roundGroupChosen === 1 && "cursor-default! hover:translate-none"} w-fit rotate-90 border-none`}
        color="custom"
        onClick={() => changeRound(roundGroupChosen, "previous")}
      >
        <DownArrow
          color={
            roundGroupChosen === 1
              ? "var(--color-gray-500)"
              : "var(--primary-60)"
          }
        />
      </Button>
      <div>RODADA {roundGroupChosen}</div>
      <Button
        className={`${roundGroupChosen === 3 && "cursor-default! hover:translate-none"} w-fit -rotate-90 border-none`}
        color="custom"
        onClick={() => changeRound(roundGroupChosen, "next")}
      >
        <DownArrow
          color={
            roundGroupChosen === 3
              ? "var(--color-gray-500)"
              : "var(--primary-60)"
          }
        />
      </Button>
    </div>
  );
}
