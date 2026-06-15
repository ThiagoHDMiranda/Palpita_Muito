type TeamType = {
  id: string;
  name: string;
  label: string;
  flagCode: string;
  group: string;
};

const TEAMS: Record<string, TeamType> = {
  // Group A
  MEX: {
    id: "MEX",
    name: "Mexico",
    label: "México",
    flagCode: "mx",
    group: "A",
  },
  RSA: {
    id: "RSA",
    name: "South Africa",
    label: "África do Sul",
    flagCode: "za",
    group: "A",
  },
  KOR: {
    id: "KOR",
    name: "South Korea",
    label: "Coreia do Sul",
    flagCode: "kr",
    group: "A",
  },
  CZE: {
    id: "CZE",
    name: "Czechia",
    label: "Tchéquia",
    flagCode: "cz",
    group: "A",
  },

  // Group B
  CAN: {
    id: "CAN",
    name: "Canada",
    label: "Canadá",
    flagCode: "ca",
    group: "B",
  },
  BIH: {
    id: "BIH",
    name: "Bosnia & Herz.",
    label: "Bósnia e H.",
    flagCode: "ba",
    group: "B",
  },
  QAT: { id: "QAT", name: "Qatar", label: "Catar", flagCode: "qa", group: "B" },
  SUI: {
    id: "SUI",
    name: "Switzerland",
    label: "Suíça",
    flagCode: "ch",
    group: "B",
  },

  // Group C
  BRA: {
    id: "BRA",
    name: "Brazil",
    label: "Brasil",
    flagCode: "br",
    group: "C",
  },
  MAR: {
    id: "MAR",
    name: "Morocco",
    label: "Marrocos",
    flagCode: "ma",
    group: "C",
  },
  HAI: { id: "HAI", name: "Haiti", label: "Haiti", flagCode: "ht", group: "C" },
  SCO: {
    id: "SCO",
    name: "Scotland",
    label: "Escócia",
    flagCode: "gb-sct",
    group: "C",
  },

  // Group D
  USA: {
    id: "USA",
    name: "United States",
    label: "Estados Unidos",
    flagCode: "us",
    group: "D",
  },
  PAR: {
    id: "PAR",
    name: "Paraguay",
    label: "Paraguai",
    flagCode: "py",
    group: "D",
  },
  AUS: {
    id: "AUS",
    name: "Australia",
    label: "Austrália",
    flagCode: "au",
    group: "D",
  },
  TUR: {
    id: "TUR",
    name: "Türkiye",
    label: "Turquia",
    flagCode: "tr",
    group: "D",
  },

  // Group E
  GER: {
    id: "GER",
    name: "Germany",
    label: "Alemanha",
    flagCode: "de",
    group: "E",
  },
  CUW: {
    id: "CUW",
    name: "Curaçao",
    label: "Curaçao",
    flagCode: "cw",
    group: "E",
  },
  CIV: {
    id: "CIV",
    name: "Côte d'Ivoire",
    label: "Costa do Marfim",
    flagCode: "ci",
    group: "E",
  },
  ECU: {
    id: "ECU",
    name: "Ecuador",
    label: "Equador",
    flagCode: "ec",
    group: "E",
  },

  // Group F
  NED: {
    id: "NED",
    name: "Netherlands",
    label: "Holanda",
    flagCode: "nl",
    group: "F",
  },
  JPN: { id: "JPN", name: "Japan", label: "Japão", flagCode: "jp", group: "F" },
  SWE: {
    id: "SWE",
    name: "Sweden",
    label: "Suécia",
    flagCode: "se",
    group: "F",
  },
  TUN: {
    id: "TUN",
    name: "Tunisia",
    label: "Tunísia",
    flagCode: "tn",
    group: "F",
  },

  // Group G
  BEL: {
    id: "BEL",
    name: "Belgium",
    label: "Bélgica",
    flagCode: "be",
    group: "G",
  },
  EGY: { id: "EGY", name: "Egypt", label: "Egito", flagCode: "eg", group: "G" },
  IRN: { id: "IRN", name: "Iran", label: "Irã", flagCode: "ir", group: "G" },
  NZL: {
    id: "NZL",
    name: "New Zealand",
    label: "Nova Zelândia",
    flagCode: "nz",
    group: "G",
  },

  // Group H
  ESP: {
    id: "ESP",
    name: "Spain",
    label: "Espanha",
    flagCode: "es",
    group: "H",
  },
  CPV: {
    id: "CPV",
    name: "Cape Verde",
    label: "Cabo Verde",
    flagCode: "cv",
    group: "H",
  },
  URU: {
    id: "URU",
    name: "Uruguay",
    label: "Uruguai",
    flagCode: "uy",
    group: "H",
  },
  KSA: {
    id: "KSA",
    name: "Saudi Arabia",
    label: "Arábia Saudita",
    flagCode: "sa",
    group: "H",
  },

  // Group I
  FRA: {
    id: "FRA",
    name: "France",
    label: "França",
    flagCode: "fr",
    group: "I",
  },
  SEN: {
    id: "SEN",
    name: "Senegal",
    label: "Senegal",
    flagCode: "sn",
    group: "I",
  },
  IRQ: { id: "IRQ", name: "Iraq", label: "Iraque", flagCode: "iq", group: "I" },
  NOR: {
    id: "NOR",
    name: "Norway",
    label: "Noruega",
    flagCode: "no",
    group: "I",
  },

  // Group J
  ARG: {
    id: "ARG",
    name: "Argentina",
    label: "Argentina",
    flagCode: "ar",
    group: "J",
  },
  ALG: {
    id: "ALG",
    name: "Algeria",
    label: "Argélia",
    flagCode: "dz",
    group: "J",
  },
  AUT: {
    id: "AUT",
    name: "Austria",
    label: "Áustria",
    flagCode: "at",
    group: "J",
  },
  JOR: {
    id: "JOR",
    name: "Jordan",
    label: "Jordânia",
    flagCode: "jo",
    group: "J",
  },

  // Group K
  POR: {
    id: "POR",
    name: "Portugal",
    label: "Portugal",
    flagCode: "pt",
    group: "K",
  },
  COD: {
    id: "COD",
    name: "DR Congo",
    label: "Rep. D. do Congo",
    flagCode: "cd",
    group: "K",
  },
  UZB: {
    id: "UZB",
    name: "Uzbekistan",
    label: "Uzbequistão",
    flagCode: "uz",
    group: "K",
  },
  COL: {
    id: "COL",
    name: "Colombia",
    label: "Colômbia",
    flagCode: "co",
    group: "K",
  },

  // Group L
  ENG: {
    id: "ENG",
    name: "England",
    label: "Inglaterra",
    flagCode: "gb-eng",
    group: "L",
  },
  CRO: {
    id: "CRO",
    name: "Croatia",
    label: "Croácia",
    flagCode: "hr",
    group: "L",
  },
  GHA: { id: "GHA", name: "Ghana", label: "Gana", flagCode: "gh", group: "L" },
  PAN: {
    id: "PAN",
    name: "Panama",
    label: "Panamá",
    flagCode: "pa",
    group: "L",
  },
};

export default TEAMS;
export type { TeamType };
