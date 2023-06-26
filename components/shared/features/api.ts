import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Game {
  id: number;
  date: string;
  home_team: Team;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: Team;
  visitor_team_score: number;
}
interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

type PlayerData = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team_id: number;
};

type Player = {
  id: number;
  ast: number;
  blk: number;
  dreb: number;
  fg3_pct: number;
  fg3a: number;
  fg3m: number;
  fg_pct: number;
  fga: number;
  fgm: number;
  ft_pct: number;
  fta: number;
  ftm: number;
  game: {
    id: number;
    date: string;
    home_team_id: number;
    home_team_score: number;
    season: number;
    visitor_team_id: number;
    visitor_team_score: number;
  };
  min: string;
  oreb: number;
  pf: number;
  player: {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    team_id: number;
  };
  pts: number;
  reb: number;
  stl: number;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  turnover: number;
};

export const api = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.balldontlie.io/api/v1/" }),
  endpoints: (builder) => ({
    getAllPostseasonGames: builder.query<Game[], void>({
      query: () => "games?per_page=100&seasons%5B%5D=2022&postseason=true",
    }),
  }),
});

export const { useGetAllPostseasonGamesQuery } = api;
