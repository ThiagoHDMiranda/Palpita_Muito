import { StadiumsType } from "./stadiums";
import TEAMS, { TeamType } from "./teams";

const ROUNDS = ["1", "2", "3", "r32", "r16", "qf", "sf", "third", "final"];
const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", ""];

type MatchType = {
  id: number;
  group: (typeof GROUPS)[number];
  round: (typeof ROUNDS)[number];
  homeTeam: TeamType; // Team or placeholder string like "1A", "Winner Match 73"
  awayTeam: TeamType;
  datetime: Date;
  stadium: StadiumsType;
  // homeScore?: number;
  // awayScore?: number;
  // homePenalties?: number; // Only for knockouts
  // awayPenalties?: number; // Only for knockouts
};

const GROUP_MATCHES: MatchType[] = [
  // ── ROUND 1 ─────────────────────────────────────────────────────────────────
  // Group A — 2026-06-11
  {
    id: 1,
    group: "A",
    round: "1",
    homeTeam: TEAMS.MEX,
    awayTeam: TEAMS.RSA,
    datetime: new Date("2026-06-11T19:00:00Z"),
    stadium: "Estadio Azteca",
  },
  {
    id: 2,
    group: "A",
    round: "1",
    homeTeam: TEAMS.KOR,
    awayTeam: TEAMS.CZE,
    datetime: new Date("2026-06-12T02:00:00Z"),
    stadium: "Estadio AKRON",
  },
  // Group B — 2026-06-11
  {
    id: 3,
    group: "B",
    round: "1",
    homeTeam: TEAMS.CAN,
    awayTeam: TEAMS.BIH,
    datetime: new Date("2026-06-12T19:00:00Z"),
    stadium: "BMO Field",
  },
  {
    id: 4,
    group: "B",
    round: "1",
    homeTeam: TEAMS.QAT,
    awayTeam: TEAMS.SUI,
    datetime: new Date("2026-06-13T19:00:00Z"),
    stadium: "Levi's Stadium",
  },
  // Group C — 2026-06-12
  {
    id: 5,
    group: "C",
    round: "1",
    homeTeam: TEAMS.BRA,
    awayTeam: TEAMS.MAR,
    datetime: new Date("2026-06-13T22:00:00Z"),
    stadium: "MetLife Stadium",
  },
  {
    id: 6,
    group: "C",
    round: "1",
    homeTeam: TEAMS.HAI,
    awayTeam: TEAMS.SCO,
    datetime: new Date("2026-06-14T01:00:00Z"),
    stadium: "Gillette Stadium",
  },
  // Group D — 2026-06-12
  {
    id: 7,
    group: "D",
    round: "1",
    homeTeam: TEAMS.USA,
    awayTeam: TEAMS.PAR,
    datetime: new Date("2026-06-13T01:00:00Z"),
    stadium: "SoFi Stadium",
  },
  {
    id: 8,
    group: "D",
    round: "1",
    homeTeam: TEAMS.AUS,
    awayTeam: TEAMS.TUR,
    datetime: new Date("2026-06-14T04:00:00Z"),
    stadium: "BC Place",
  },
  // Group E — 2026-06-13
  {
    id: 9,
    group: "E",
    round: "1",
    homeTeam: TEAMS.GER,
    awayTeam: TEAMS.CUW,
    datetime: new Date("2026-06-14T17:00:00Z"),
    stadium: "NRG Stadium",
  },
  {
    id: 10,
    group: "E",
    round: "1",
    homeTeam: TEAMS.CIV,
    awayTeam: TEAMS.ECU,
    datetime: new Date("2026-06-14T23:00:00Z"),
    stadium: "Lincoln Financial Field",
  },
  // Group F — 2026-06-13
  {
    id: 11,
    group: "F",
    round: "1",
    homeTeam: TEAMS.NED,
    awayTeam: TEAMS.JPN,
    datetime: new Date("2026-06-14T20:00:00Z"),
    stadium: "AT&T Stadium",
  },
  {
    id: 12,
    group: "F",
    round: "1",
    homeTeam: TEAMS.SWE,
    awayTeam: TEAMS.TUN,
    datetime: new Date("2026-06-15T02:00:00Z"),
    stadium: "Estadio BBVA",
  },
  // Group G — 2026-06-14
  {
    id: 13,
    group: "G",
    round: "1",
    homeTeam: TEAMS.BEL,
    awayTeam: TEAMS.EGY,
    datetime: new Date("2026-06-15T19:00:00Z"),
    stadium: "Lumen Field",
  },
  {
    id: 14,
    group: "G",
    round: "1",
    homeTeam: TEAMS.IRN,
    awayTeam: TEAMS.NZL,
    datetime: new Date("2026-06-16T01:00:00Z"),
    stadium: "SoFi Stadium",
  },
  // Group H — 2026-06-14
  {
    id: 15,
    group: "H",
    round: "1",
    homeTeam: TEAMS.ESP,
    awayTeam: TEAMS.CPV,
    datetime: new Date("2026-06-15T16:00:00Z"),
    stadium: "Mercedes-Benz Stadium",
  },
  {
    id: 16,
    group: "H",
    round: "1",
    homeTeam: TEAMS.KSA,
    awayTeam: TEAMS.URU,
    datetime: new Date("2026-06-15T22:00:00Z"),
    stadium: "Hard Rock Stadium",
  },
  // Group I — 2026-06-15
  {
    id: 17,
    group: "I",
    round: "1",
    homeTeam: TEAMS.FRA,
    awayTeam: TEAMS.SEN,
    datetime: new Date("2026-06-16T19:00:00Z"),
    stadium: "MetLife Stadium",
  },
  {
    id: 18,
    group: "I",
    round: "1",
    homeTeam: TEAMS.IRQ,
    awayTeam: TEAMS.NOR,
    datetime: new Date("2026-06-16T22:00:00Z"),
    stadium: "Gillette Stadium",
  },
  // Group J — 2026-06-15
  {
    id: 19,
    group: "J",
    round: "1",
    homeTeam: TEAMS.ARG,
    awayTeam: TEAMS.ALG,
    datetime: new Date("2026-06-17T01:00:00Z"),
    stadium: "Arrowhead Stadium",
  },
  {
    id: 20,
    group: "J",
    round: "1",
    homeTeam: TEAMS.AUT,
    awayTeam: TEAMS.JOR,
    datetime: new Date("2026-06-17T04:00:00Z"),
    stadium: "Levi's Stadium",
  },
  // Group K — 2026-06-16
  {
    id: 21,
    group: "K",
    round: "1",
    homeTeam: TEAMS.POR,
    awayTeam: TEAMS.COD,
    datetime: new Date("2026-06-17T17:00:00Z"),
    stadium: "NRG Stadium",
  },
  {
    id: 22,
    group: "K",
    round: "1",
    homeTeam: TEAMS.UZB,
    awayTeam: TEAMS.COL,
    datetime: new Date("2026-06-18T02:00:00Z"),
    stadium: "Estadio Azteca",
  },
  // Group L — 2026-06-16
  {
    id: 23,
    group: "L",
    round: "1",
    homeTeam: TEAMS.ENG,
    awayTeam: TEAMS.CRO,
    datetime: new Date("2026-06-17T20:00:00Z"),
    stadium: "AT&T Stadium",
  },
  {
    id: 24,
    group: "L",
    round: "1",
    homeTeam: TEAMS.GHA,
    awayTeam: TEAMS.PAN,
    datetime: new Date("2026-06-17T23:00:00Z"),
    stadium: "BMO Field",
  },

  // ── ROUND 2 ─────────────────────────────────────────────────────────────────
  // Group A — 2026-06-17
  {
    id: 25,
    group: "A",
    round: "2",
    homeTeam: TEAMS.CZE,
    awayTeam: TEAMS.RSA,
    datetime: new Date("2026-06-18T16:00:00Z"),
    stadium: "Mercedes-Benz Stadium",
  },
  {
    id: 26,
    group: "A",
    round: "2",
    homeTeam: TEAMS.MEX,
    awayTeam: TEAMS.KOR,
    datetime: new Date("2026-06-19T01:00:00Z"),
    stadium: "Estadio AKRON",
  },

  // Group B — 2026-06-17
  {
    id: 27,
    group: "B",
    round: "2",
    homeTeam: TEAMS.SUI,
    awayTeam: TEAMS.BIH,
    datetime: new Date("2026-06-18T19:00:00Z"),
    stadium: "SoFi Stadium",
  },
  {
    id: 28,
    group: "B",
    round: "2",
    homeTeam: TEAMS.CAN,
    awayTeam: TEAMS.QAT,
    datetime: new Date("2026-06-18T22:00:00Z"),
    stadium: "BC Place",
  },
  // Group C — 2026-06-18

  {
    id: 29,
    group: "C",
    round: "2",
    homeTeam: TEAMS.SCO,
    awayTeam: TEAMS.MAR,
    datetime: new Date("2026-06-19T22:00:00Z"),
    stadium: "Gillette Stadium",
  },
  {
    id: 30,
    group: "C",
    round: "2",
    homeTeam: TEAMS.BRA,
    awayTeam: TEAMS.HAI,
    datetime: new Date("2026-06-20T00:30:00Z"),
    stadium: "Lincoln Financial Field",
  },
  // Group D — 2026-06-18
  {
    id: 31,
    group: "D",
    round: "2",
    homeTeam: TEAMS.USA,
    awayTeam: TEAMS.AUS,
    datetime: new Date("2026-06-19T19:00:00Z"),
    stadium: "Lumen Field",
  },
  {
    id: 32,
    group: "D",
    round: "2",
    homeTeam: TEAMS.TUR,
    awayTeam: TEAMS.PAR,
    datetime: new Date("2026-06-20T03:00:00Z"),
    stadium: "Levi's Stadium",
  },
  // Group E — 2026-06-19
  {
    id: 33,
    group: "E",
    round: "2",
    homeTeam: TEAMS.GER,
    awayTeam: TEAMS.CIV,
    datetime: new Date("2026-06-20T20:00:00Z"),
    stadium: "BMO Field",
  },
  {
    id: 34,
    group: "E",
    round: "2",
    homeTeam: TEAMS.ECU,
    awayTeam: TEAMS.CUW,
    datetime: new Date("2026-06-21T00:00:00Z"),
    stadium: "Arrowhead Stadium",
  },
  // Group F — 2026-06-19
  {
    id: 35,
    group: "F",
    round: "2",
    homeTeam: TEAMS.NED,
    awayTeam: TEAMS.SWE,
    datetime: new Date("2026-06-20T17:00:00Z"),
    stadium: "NRG Stadium",
  },
  {
    id: 36,
    group: "F",
    round: "2",
    homeTeam: TEAMS.TUN,
    awayTeam: TEAMS.JPN,
    datetime: new Date("2026-06-21T04:00:00Z"),
    stadium: "Estadio BBVA",
  },
  // Group G — 2026-06-20
  {
    id: 37,
    group: "G",
    round: "2",
    homeTeam: TEAMS.BEL,
    awayTeam: TEAMS.IRN,
    datetime: new Date("2026-06-21T19:00:00Z"),
    stadium: "SoFi Stadium",
  },
  {
    id: 38,
    group: "G",
    round: "2",
    homeTeam: TEAMS.NZL,
    awayTeam: TEAMS.EGY,
    datetime: new Date("2026-06-22T01:00:00Z"),
    stadium: "BC Place",
  },
  // Group H — 2026-06-20
  {
    id: 39,
    group: "H",
    round: "2",
    homeTeam: TEAMS.ESP,
    awayTeam: TEAMS.KSA,
    datetime: new Date("2026-06-21T16:00:00Z"),
    stadium: "Mercedes-Benz Stadium",
  },
  {
    id: 40,
    group: "H",
    round: "2",
    homeTeam: TEAMS.URU,
    awayTeam: TEAMS.CPV,
    datetime: new Date("2026-06-21T22:00:00Z"),
    stadium: "Hard Rock Stadium",
  },
  // Group I — 2026-06-21
  {
    id: 41,
    group: "I",
    round: "2",
    homeTeam: TEAMS.FRA,
    awayTeam: TEAMS.IRQ,
    datetime: new Date("2026-06-22T21:00:00Z"),
    stadium: "Lincoln Financial Field",
  },
  {
    id: 42,
    group: "I",
    round: "2",
    homeTeam: TEAMS.NOR,
    awayTeam: TEAMS.SEN,
    datetime: new Date("2026-06-23T00:00:00Z"),
    stadium: "MetLife Stadium",
  },
  // Group J — 2026-06-21
  {
    id: 43,
    group: "J",
    round: "2",
    homeTeam: TEAMS.ARG,
    awayTeam: TEAMS.AUT,
    datetime: new Date("2026-06-22T17:00:00Z"),
    stadium: "AT&T Stadium",
  },
  {
    id: 44,
    group: "J",
    round: "2",
    homeTeam: TEAMS.JOR,
    awayTeam: TEAMS.ALG,
    datetime: new Date("2026-06-23T03:00:00Z"),
    stadium: "Levi's Stadium",
  },
  // Group K — 2026-06-22
  {
    id: 45,
    group: "K",
    round: "2",
    homeTeam: TEAMS.POR,
    awayTeam: TEAMS.UZB,
    datetime: new Date("2026-06-23T17:00:00Z"),
    stadium: "NRG Stadium",
  },
  {
    id: 46,
    group: "K",
    round: "2",
    homeTeam: TEAMS.COL,
    awayTeam: TEAMS.COD,
    datetime: new Date("2026-06-24T02:00:00Z"),
    stadium: "Estadio AKRON",
  },
  // Group L — 2026-06-22
  {
    id: 47,
    group: "L",
    round: "2",
    homeTeam: TEAMS.ENG,
    awayTeam: TEAMS.GHA,
    datetime: new Date("2026-06-23T20:00:00Z"),
    stadium: "Gillette Stadium",
  },
  {
    id: 48,
    group: "L",
    round: "2",
    homeTeam: TEAMS.PAN,
    awayTeam: TEAMS.CRO,
    datetime: new Date("2026-06-23T23:00:00Z"),
    stadium: "BMO Field",
  },

  // ── ROUND 3 (simultaneous per group) ────────────────────────────────────────
  // Group A — 2026-06-23

  {
    id: 49,
    group: "A",
    round: "3",
    homeTeam: TEAMS.RSA,
    awayTeam: TEAMS.KOR,
    datetime: new Date("2026-06-25T01:00:00Z"),
    stadium: "Estadio BBVA",
  },
  {
    id: 50,
    group: "A",
    round: "3",
    homeTeam: TEAMS.CZE,
    awayTeam: TEAMS.MEX,
    datetime: new Date("2026-06-25T01:00:00Z"),
    stadium: "Estadio Azteca",
  },
  // Group B — 2026-06-23
  {
    id: 51,
    group: "B",
    round: "3",
    homeTeam: TEAMS.SUI,
    awayTeam: TEAMS.CAN,
    datetime: new Date("2026-06-24T19:00:00Z"),
    stadium: "BC Place",
  },
  {
    id: 52,
    group: "B",
    round: "3",
    homeTeam: TEAMS.BIH,
    awayTeam: TEAMS.QAT,
    datetime: new Date("2026-06-24T19:00:00Z"),
    stadium: "Lumen Field",
  },
  // Group C — 2026-06-23

  {
    id: 53,
    group: "C",
    round: "3",
    homeTeam: TEAMS.MAR,
    awayTeam: TEAMS.HAI,
    datetime: new Date("2026-06-24T22:00:00Z"),
    stadium: "Mercedes-Benz Stadium",
  },
  {
    id: 54,
    group: "C",
    round: "3",
    homeTeam: TEAMS.SCO,
    awayTeam: TEAMS.BRA,
    datetime: new Date("2026-06-24T22:00:00Z"),
    stadium: "Hard Rock Stadium",
  },
  // Group D — 2026-06-24
  {
    id: 55,
    group: "D",
    round: "3",
    homeTeam: TEAMS.TUR,
    awayTeam: TEAMS.USA,
    datetime: new Date("2026-06-26T02:00:00Z"),
    stadium: "SoFi Stadium",
  },
  {
    id: 56,
    group: "D",
    round: "3",
    homeTeam: TEAMS.PAR,
    awayTeam: TEAMS.AUS,
    datetime: new Date("2026-06-26T02:00:00Z"),
    stadium: "Levi's Stadium",
  },
  // Group E — 2026-06-24
  {
    id: 57,
    group: "E",
    round: "3",
    homeTeam: TEAMS.ECU,
    awayTeam: TEAMS.GER,
    datetime: new Date("2026-06-25T20:00:00Z"),
    stadium: "MetLife Stadium",
  },
  {
    id: 58,
    group: "E",
    round: "3",
    homeTeam: TEAMS.CUW,
    awayTeam: TEAMS.CIV,
    datetime: new Date("2026-06-25T20:00:00Z"),
    stadium: "Lincoln Financial Field",
  },
  // Group F — 2026-06-25
  {
    id: 59,
    group: "F",
    round: "3",
    homeTeam: TEAMS.TUN,
    awayTeam: TEAMS.NED,
    datetime: new Date("2026-06-25T23:00:00Z"),
    stadium: "Arrowhead Stadium",
  },
  {
    id: 60,
    group: "F",
    round: "3",
    homeTeam: TEAMS.JPN,
    awayTeam: TEAMS.SWE,
    datetime: new Date("2026-06-25T23:00:00Z"),
    stadium: "AT&T Stadium",
  },
  // Group G — 2026-06-25

  {
    id: 61,
    group: "G",
    round: "3",
    homeTeam: TEAMS.EGY,
    awayTeam: TEAMS.IRN,
    datetime: new Date("2026-06-27T03:00:00Z"),
    stadium: "Lumen Field",
  },
  {
    id: 62,
    group: "G",
    round: "3",
    homeTeam: TEAMS.NZL,
    awayTeam: TEAMS.BEL,
    datetime: new Date("2026-06-27T03:00:00Z"),
    stadium: "BC Place",
  },
  // Group H — 2026-06-25
  {
    id: 63,
    group: "H",
    round: "3",
    homeTeam: TEAMS.CPV,
    awayTeam: TEAMS.KSA,
    datetime: new Date("2026-06-27T00:00:00Z"),
    stadium: "NRG Stadium",
  },
  {
    id: 64,
    group: "H",
    round: "3",
    homeTeam: TEAMS.URU,
    awayTeam: TEAMS.ESP,
    datetime: new Date("2026-06-27T00:00:00Z"),
    stadium: "Estadio AKRON",
  },

  // Group I — 2026-06-26
  {
    id: 65,
    group: "I",
    round: "3",
    homeTeam: TEAMS.SEN,
    awayTeam: TEAMS.IRQ,
    datetime: new Date("2026-06-26T19:00:00Z"),
    stadium: "BMO Field",
  },
  {
    id: 66,
    group: "I",
    round: "3",
    homeTeam: TEAMS.NOR,
    awayTeam: TEAMS.FRA,
    datetime: new Date("2026-06-26T19:00:00Z"),
    stadium: "Gillette Stadium",
  },

  // Group J — 2026-06-26
  {
    id: 67,
    group: "J",
    round: "3",
    homeTeam: TEAMS.JOR,
    awayTeam: TEAMS.ARG,
    datetime: new Date("2026-06-28T02:00:00Z"),
    stadium: "AT&T Stadium",
  },
  {
    id: 68,
    group: "J",
    round: "3",
    homeTeam: TEAMS.ALG,
    awayTeam: TEAMS.AUT,
    datetime: new Date("2026-06-28T02:00:00Z"),
    stadium: "Arrowhead Stadium",
  },
  // Group K — 2026-06-27

  {
    id: 69,
    group: "K",
    round: "3",
    homeTeam: TEAMS.COD,
    awayTeam: TEAMS.UZB,
    datetime: new Date("2026-06-27T23:30:00Z"),
    stadium: "Mercedes-Benz Stadium",
  },
  {
    id: 70,
    group: "K",
    round: "3",
    homeTeam: TEAMS.COL,
    awayTeam: TEAMS.POR,
    datetime: new Date("2026-06-27T23:30:00Z"),
    stadium: "Hard Rock Stadium",
  },
  // Group L — 2026-06-27
  {
    id: 71,
    group: "L",
    round: "3",
    homeTeam: TEAMS.CRO,
    awayTeam: TEAMS.GHA,
    datetime: new Date("2026-06-27T21:00:00Z"),
    stadium: "Lincoln Financial Field",
  },
  {
    id: 72,
    group: "L",
    round: "3",
    homeTeam: TEAMS.PAN,
    awayTeam: TEAMS.ENG,
    datetime: new Date("2026-06-27T21:00:00Z"),
    stadium: "MetLife Stadium",
  },
];

export default GROUP_MATCHES;
export { ROUNDS, GROUPS };
export type { MatchType };
