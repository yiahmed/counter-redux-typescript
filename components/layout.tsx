import { useAppSelector, useAppDispatch } from "./hooks";
import { addPlayers } from "./shared/features/players/playerSlice";
import Navbar from "./nav/Navbar";
import React , { useEffect, useState } from "react";
import axios from "axios";

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
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const requests = [];
      const options = {
        method: "GET",
        url: "https://www.balldontlie.io/api/v1/stats",
        params: {
          "seasons[]": ["2022", "2023"],
          postseason: "true",
          per_page: "100",
        },
      };

      const responses: Player[] = [];
      for (let page = 1; page <= 24; page++) {
        const request = axios.request({
          ...options,
          params: { ...options.params, page },
        });
        requests.push(request);
      }

      try {
        const results = await axios.all(requests);
        results.forEach((response) => {
          responses.push(...response.data.data);
        });

        setPlayers(responses);

        const uniqueIds: { [key: number]: boolean } = {};
        const uniquePlayers = responses.reduce(
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
        // console.log(uniquePlayers); // Log the unique players
        // console.log(uniquePlayerData);

        setPostSeasonPlayers(uniquePlayerData);
        dispatch(addPlayers(uniquePlayerData))
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // console.log(postSeasonPlayers);
  console.log("redux", playersFromRedux);

  return (
    <div className="h-screen w-screen bg-white">
      <Navbar />
      <main style={{height: "92%",
      overflow: "auto"}}>{children}</main>
    </div>
  );
}