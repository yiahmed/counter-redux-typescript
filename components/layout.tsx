import { useAppSelector, useAppDispatch } from "./hooks";
import { addPlayers } from "./shared/features/players/playerSlice";
import Navbar from "./nav/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetAllPostseasonStatsQuery } from "./shared/features/ballDontLieEndpoints";
import { data } from "autoprefixer";

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

type PlayerData = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team_id: number;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const playersFromRedux = useAppSelector((state) => state.players.players);

  const [players, setPlayers] = useState<Player[] | null>(null);
  const [postSeasonPlayers, setPostSeasonPlayers] = useState<PlayerData[]>([]);
  const dispatch = useAppDispatch();
  const {
    data: playersJSON,
    isError,
    isLoading,
  } = useGetAllPostseasonStatsQuery(1);

  useEffect(() => {
    if (!isLoading && playersJSON && playersJSON.data) {
      const uniqueIds: { [key: number]: boolean } = {};
      const uniquePlayers = playersJSON.data.reduce(
        (acc: Player[], player: Player) => {
          if (!uniqueIds[player.player.id]) {
            uniqueIds[player.player.id] = true;
            acc.push(player);
          }
          return acc;
        },
        []
      );

      const uniquePlayerData = uniquePlayers.map(
        (playerData) => playerData.player
      );

      setPlayers(uniquePlayers);
      setPostSeasonPlayers(uniquePlayerData);
      dispatch(addPlayers(uniquePlayerData));
    }
  }, [isLoading, isError, playersJSON]);

  // console.log(postSeasonPlayers);
  console.log("redux", playersFromRedux);

  return (
    <div className="h-screen w-screen bg-white">
      <Navbar />
      <main style={{ height: "92%", overflow: "auto" }}>{children}</main>
    </div>
  );
}
