import AppBar from "@/components/appBar";
import MaxWidth from "@/components/maxWidth";
import NavitationTab from "@/components/navigationTab";
import Ranking from "./ranking";
import Standings from "./guesses/standings";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <AppBar exitButton={true} />
      <div className="w-full flex flex-col items-center pt-25">
        <NavitationTab />
        <MaxWidth>
          <div className="pt-5 flex flex-col">
            <Ranking />
          </div>
        </MaxWidth>
      </div>
    </div>
  );
}
