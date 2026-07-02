import GuessSVG from "@/public/guessIcon";
import RankingSVG from "@/public/rankingIcon";
import ResultsSVG from "@/public/resultsIcon";

type NavigationTabButtons = {
  label: string;
  pathname: string;
  svgIcon: React.ComponentType<{ color: string; size: number }>;
  iconClassName: string;
};

const NAVIGATION_TAB_BUTTONS: NavigationTabButtons[] = [
  {
    label: "Palpites",
    pathname: "/guesses",
    svgIcon: GuessSVG,
    iconClassName: "relative -translate-y-0.5",
  },
  {
    label: "Resultados",
    pathname: "/results",
    svgIcon: ResultsSVG,
    iconClassName: "relative -translate-y-0.5",
  },
  {
    label: "Ranking",
    pathname: "/",
    svgIcon: RankingSVG,
    iconClassName: "relative -translate-y-0.5",
  },
];

export default NAVIGATION_TAB_BUTTONS;
