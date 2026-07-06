"use client";

import Dropdown from "@/components/dropdown";
import MATCHES, { GROUPS, MatchType } from "../../constants/matches";
import { useEffect, useState } from "react";
import CardMatches from "./cardMatches";
import Standings from "./standings";
import ChooseGroup from "./chooseGroup";
import ChooseRound from "./chooseRound";
import { GuessIndexedDBType, MatchIndexedDBType } from "@/types/match";
import {
  getAllGuessesFromUserIndexedDB,
  getAllResultsIndexedDB,
} from "@/server/indexedDB";
import Loading from "@/components/loading";

const RoundListLabel = [
  "FASE DE GRUPOS",
  "SEGUNDA FASE",
  "OITAVAS DE FINAL",
  "QUARTAS DE FINAL",
  "SEMIFINAL",
  "FINAL & 3° LUGAR",
];

export type RoundGroupChosenType = 1 | 2 | 3;

const RoundList = [
  ["1", "2", "3"],
  ["16 avos"],
  ["Oitavas"],
  ["Quartas"],
  ["Semi"],
  ["Terceiro lugar", "Final"],
];

export default function CardData() {
  const groupLastIndex = GROUPS.length - 2;
  const [roundChosen, setRoundChosen] = useState(0);
  const [groupChosen, setGroupChosen] = useState<(typeof GROUPS)[number]>("A");
  const [roundGroupChosen, setRoundGroupChosen] =
    useState<RoundGroupChosenType>(1);
  const [guesses, setGuesses] = useState<GuessIndexedDBType[]>([]);
  const [results, setResults] = useState<MatchIndexedDBType[]>([]);
  const [groupMatches, setGroupMatches] = useState<MatchType[]>([]);
  const [roundMatches, setRoundMatches] = useState<MatchType[]>([]);
  const [changeData, setChangeData] = useState(0);

  function changeGroup(
    currentGroup: (typeof GROUPS)[number],
    changeTo: "previous" | "next",
  ) {
    const groupIndex = GROUPS.indexOf(currentGroup);
    let newGroup;

    if (changeTo === "previous") {
      if (groupIndex === 0) {
        return;
      }

      newGroup = GROUPS[groupIndex - 1];
    } else {
      if (groupIndex === groupLastIndex) {
        return;
      }

      newGroup = GROUPS[groupIndex + 1];
    }

    setGroupChosen(newGroup);
  }

  function changeRound(
    currentRound: RoundGroupChosenType,
    changeTo: "previous" | "next",
  ) {
    const rounds: RoundGroupChosenType[] = [1, 2, 3];
    let newRound: RoundGroupChosenType = 1;
    if (changeTo === "previous") {
      if (currentRound === 1) {
        return;
      }
      newRound = rounds[currentRound - 2];
    } else {
      if (currentRound === 3) {
        return;
      }
      newRound = rounds[currentRound];
    }

    setRoundGroupChosen(newRound);
  }

  async function loadGuess() {
    const getGuesses = await getAllGuessesFromUserIndexedDB();
    if (!getGuesses) return;
    setGuesses(getGuesses);
  }

  async function loadResult() {
    const getResults = await getAllResultsIndexedDB();
    if (!getResults) return;
    setResults(getResults);
  }

  useEffect(() => {
    loadGuess();
    loadResult();
  }, [changeData]);

  function handleGroupChanges() {
    const RoundListArray = RoundList[roundChosen];

    let matches;

    if (roundChosen === 0) {
      matches = MATCHES.filter((match) => match.group === groupChosen);
      setGroupMatches(matches);

      matches = matches.filter(
        (match) => match.round === roundGroupChosen.toString(),
      );
    } else {
      matches = MATCHES.filter((match) => RoundListArray.includes(match.round));
      console.log(matches);
      console.log("groupMatches: ", !groupMatches[0]);
    }

    setRoundMatches(matches);
  }

  useEffect(() => {
    handleGroupChanges();
  }, [groupChosen, roundGroupChosen, roundChosen]);

  return (
    <div>
      {!groupMatches[0] ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5 mb-10 sm:mb-0">
          <div className="flex gap-5">
            <Dropdown
              label="FASE: "
              list={RoundListLabel}
              chosen={roundChosen}
              setChosen={setRoundChosen}
            />
          </div>
          {roundChosen === 0 ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <ChooseGroup
                  groupChosen={groupChosen}
                  changeGroup={changeGroup}
                />
                <ChooseRound
                  roundGroupChosen={roundGroupChosen}
                  changeRound={changeRound}
                />
                <CardMatches
                  matches={roundMatches}
                  guesses={guesses}
                  setChangeData={setChangeData}
                  results={results}
                />
              </div>
              <Standings
                group={groupChosen}
                matches={groupMatches}
                guesses={guesses}
                results={results}
              />
            </div>
          ) : (
            <div className="mb-10 sm:mb-5">
              {!roundMatches[0] ? (
                <div className="text-center text-gray-300 font-bold mt-5">
                  Jogos indefinidos
                </div>
              ) : (
                <CardMatches
                  matches={roundMatches}
                  guesses={guesses}
                  setChangeData={setChangeData}
                  results={results}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
