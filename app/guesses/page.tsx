import AppBar from "@/components/appBar";
import NavitationTab from "@/components/navigationTab";
import MaxWidth from "@/components/maxWidth";
import CardData from "./cardData";
import { auth } from "@/server/auth";

export default async function GuessesPage() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <AppBar
        exitButton={true}
        fromPage={"/guesses"}
        resultsButton={session?.user.role === "ADMIN"}
      />
      <MaxWidth>
        <div className="pt-30 flex flex-col h-screen w-full">
          <NavitationTab />
          {/* <CountPoints/> */}
          <CardData />
          {/* <CardMatches /> */}
        </div>
      </MaxWidth>
    </div>
  );
}
