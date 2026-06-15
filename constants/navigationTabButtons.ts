import RankingSVG from "@/public/rankingIcon";
import ResultsSVG from "@/public/resultsIcon";

type NavigationTabButtons = {
  label: string;
  className: string;
  pathname: string;
  svgIcon: React.ComponentType<{ color: string; size: number }>;
};

const NAVIGATION_TAB_BUTTONS: NavigationTabButtons[] = [
  {
    label: "Palpites",
    className: "",
    pathname: "/guesses",
    svgIcon: ResultsSVG,
  },
  {
    label: "Ranking",
    className: "relative -translate-y-0.5",
    pathname: "/",
    svgIcon: RankingSVG,
  },
  {
    label: "",
    className: "",
    pathname: "",
    svgIcon: RankingSVG,
  },
];

export default NAVIGATION_TAB_BUTTONS;
