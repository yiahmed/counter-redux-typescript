import React, { useState, useEffect } from "react";
import axios from "axios";

type PlayerStats = {
  games_played: number;
  player_id: number;
  season: number;
  min: string;
  fgm: number;
  fga: number;
  fg3m: number;
  fg3a: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  turnover: number;
  pf: number;
  pts: number;
  fg_pct: number;
  fg3_pct: number;
  ft_pct: number;
};

type PlayerStatProps = {
  playerId: number;
};

const PlayerStat = ({ playerId }: PlayerStatProps) => {
  const [averagePts, setAveragePts] = useState<number>(0);
  const [totalGames, setTotalGames] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&per_page=82&seasons[]=2022`
        );
        const playerStats: PlayerStats[] = response.data.data;
        const filteredStats = playerStats.filter(
          (stat) =>
            stat.games_played >= 10 && stat.pts / stat.games_played > 0.9
        );
        const totalPts = filteredStats.reduce((sum, stat) => sum + stat.pts, 0);
        const average = totalPts / filteredStats.length;
        setAveragePts(average);
        setTotalGames(filteredStats.length);
        console.log("Average Points per Game:", average);
        console.log("Total Games Played:", filteredStats.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [playerId]);

  return (
    <div className="text-black">
      <h2>Average Points per Game for Player ID {playerId} (2022 Season):</h2>
      <h2>{averagePts}</h2>
      <h2>Total Games Played: {totalGames}</h2>
    </div>
  );
};

export default PlayerStat;
