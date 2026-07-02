export type GuessIndexedDBType = {
  matchId: number;
  homeGoals: number;
  awayGoals: number;
  points: number;
};

export type MatchIndexedDBType = GuessIndexedDBType & {
  extraTime: boolean;
  homeETGoals: number | null;
  awayETGoals: number | null;
  homePenalties: number | null;
  awayPenalties: number | null;
  points: number;
};

export type MatchResultType = {
  matchId: number;
  homeGoals: number;
  awayGoals: number;
  extraTime: boolean;
  homeETGoals: number | null;
  awayETGoals: number | null;
  homePenalties: number | null;
  awayPenalties: number | null;
  updatedAt: Date;
};

export type GuessDBType = {
  matchId: number;
  userId: string;
  homeGoals: number;
  awayGoals: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
};

export type GuessType = {
  homeGoals: number | "-" | "";
  awayGoals: number | "-" | "";
  extraTime: boolean;
  homeETGoals: number | null;
  awayETGoals: number | null;
  homePenalties: number | null;
  awayPenalties: number | null;
  points: number;
};
