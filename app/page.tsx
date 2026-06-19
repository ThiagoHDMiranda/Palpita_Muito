import AppBar from "@/components/appBar";
import NavitationTab from "@/components/navigationTab";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <AppBar
        exitButton={true}
        resultsButton={session?.user.role === "ADMIN"}
      />

      <NavitationTab />
    </div>
  );
}
