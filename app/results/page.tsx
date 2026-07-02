import AppBar from "@/components/appBar";
import NavitationTab from "@/components/navigationTab";
import MaxWidth from "@/components/maxWidth";
import CardMatchResults from "./cardMatchResults";

export default async function ResultsPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <AppBar exitButton={true} />
      <div className="w-full flex flex-col items-center pt-25">
        <NavitationTab />
        <MaxWidth>
          <div className="pt-5 flex flex-col">
            <CardMatchResults />
          </div>
        </MaxWidth>
      </div>
    </div>
  );
}
