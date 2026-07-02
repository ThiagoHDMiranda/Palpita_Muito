import AppBar from "@/components/appBar";
import NavitationTab from "@/components/navigationTab";
import MaxWidth from "@/components/maxWidth";
import CardData from "./cardData";
import { auth } from "@/server/auth";

export default async function GuessesPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <AppBar exitButton={true} fromPage={"/guesses"} />
      <div className="w-full flex flex-col items-center pt-25">
        <NavitationTab />
        <MaxWidth>
          <div className="pt-5 flex flex-col">
            <CardData />
          </div>
        </MaxWidth>
      </div>
    </div>
  );
}
