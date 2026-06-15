import AppBar from "@/components/appBar";
import NavitationTab from "@/components/navigationTab";
import CardMatches from "./cardMatches";

export default function GuessesPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <AppBar exitButton={true} />
      <div className="pt-30 px-5 flex flex-col h-screen w-full">
        <NavitationTab />
        {/* <CountPoints/> */}
        <CardMatches />
      </div>
    </div>
  );
}
