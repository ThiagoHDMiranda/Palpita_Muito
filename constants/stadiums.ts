type StadiumType = {
  city: string;
  country: "Canadá" | "Estados Unidos" | "México";
};

type StadiumsType =
  | "Estadio Azteca"
  | "Estadio AKRON"
  | "BMO Field"
  | "SoFi Stadium"
  | "Levi's Stadium"
  | "MetLife Stadium"
  | "Gillette Stadium"
  | "BC Place"
  | "NRG Stadium"
  | "Lincoln Financial Field"
  | "AT&T Stadium"
  | "Estadio BBVA"
  | "Mercedes-Benz Stadium"
  | "Hard Rock Stadium"
  | "Lumen Field"
  | "Arrowhead Stadium";

const STADIUMS_INFO: Record<StadiumsType, StadiumType> = {
  "Estadio Azteca": {
    city: "Cidade do México",
    country: "México",
  },
  "Estadio AKRON": {
    city: "Zapopan",
    country: "México",
  },
  "BMO Field": {
    city: "Toronto",
    country: "Canadá",
  },
  "SoFi Stadium": {
    city: "Los Angeles",
    country: "Estados Unidos",
  },
  "Levi's Stadium": {
    city: "Santa Clara",
    country: "Estados Unidos",
  },
  "MetLife Stadium": {
    city: "Nova Jersey",
    country: "Estados Unidos",
  },
  "Gillette Stadium": {
    city: "Foxborough",
    country: "Estados Unidos",
  },
  "BC Place": {
    city: "Vancouver",
    country: "Canadá",
  },
  "NRG Stadium": {
    city: "Houston",
    country: "Estados Unidos",
  },
  "Lincoln Financial Field": {
    city: "Filadélfia",
    country: "Estados Unidos",
  },
  "AT&T Stadium": {
    city: "Arlington",
    country: "Estados Unidos",
  },
  "Estadio BBVA": {
    city: "Guadalupe",
    country: "México",
  },
  "Mercedes-Benz Stadium": {
    city: "Atlanta",
    country: "Estados Unidos",
  },
  "Hard Rock Stadium": {
    city: "Miami",
    country: "Estados Unidos",
  },
  "Lumen Field": {
    city: "Seattle",
    country: "Estados Unidos",
  },
  "Arrowhead Stadium": {
    city: "Kansas City",
    country: "Estados Unidos",
  },
};

export default STADIUMS_INFO;
export type { StadiumsType };
