import AppBar from "@/components/appBar";
import NavitationTab from "@/components/navigationTab";
import MaxWidth from "@/components/maxWidth";
import CardMatchResults from "./cardMatchResults";

export default async function ResultsPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <AppBar goBack={true} exitButton={true} />
      <MaxWidth>
        <div className="pt-30 flex flex-col h-screen w-full gap-10">
          <NavitationTab />
          <CardMatchResults />
        </div>
      </MaxWidth>
    </div>
  );
}
