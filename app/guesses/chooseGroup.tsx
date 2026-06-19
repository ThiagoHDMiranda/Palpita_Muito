import Button from "@/components/button";
import { GROUPS } from "@/constants/matches";
import DownArrow from "@/public/downArrowIcon";

interface ChooseGroupProps {
  groupChosen: (typeof GROUPS)[number];
  changeGroup: (
    currentGroup: (typeof GROUPS)[number],
    changeTo: "previous" | "next",
  ) => void;
}

export default function ChooseGroup({
  groupChosen,
  changeGroup,
}: ChooseGroupProps) {
  return (
    <div className="w-full flex justify-between text-gray-300 font-bold">
      <Button
        className={`${GROUPS.indexOf(groupChosen) === 0 && "cursor-default! hover:translate-none"} w-fit rotate-90 border-none`}
        color="custom"
        onClick={() => changeGroup(groupChosen, "previous")}
      >
        <DownArrow
          color={
            GROUPS.indexOf(groupChosen) === 0
              ? "var(--color-gray-500)"
              : "var(--color-gray-300)"
          }
        />
      </Button>
      <div>GRUPO {groupChosen}</div>
      <Button
        className={`${GROUPS.indexOf(groupChosen) === GROUPS.length - 1 && "cursor-default! hover:translate-none"} w-fit -rotate-90 border-none`}
        color="custom"
        onClick={() => changeGroup(groupChosen, "next")}
      >
        <DownArrow
          color={
            GROUPS.indexOf(groupChosen) === GROUPS.length - 1
              ? "var(--color-gray-500)"
              : "var(--color-gray-300)"
          }
        />
      </Button>
    </div>
  );
}
