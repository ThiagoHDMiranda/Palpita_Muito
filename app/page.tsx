import AppBar from "@/components/appBar";
import NavitationTab from "@/components/navigationTab";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <AppBar exitButton={true} />

      <NavitationTab />
    </div>
  );
}
