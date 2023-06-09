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

const useFetchPlayer = async (playerId: string | string[] | undefined) => {
  try {
    const response = await axios.get(
      `https://www.balldontlie.io/api/v1/stats?per_page=100&postseason=true&seasons[]=2022&player_ids[]=${playerId}`
    );
    const playerStats: PlayerStats[] = response.data.data;
    console.log(response.data);
    const filteredStats = playerStats.filter(
      (stat) => stat.pts !== 0 || stat.reb !== 0 || stat.ast !== 0
    );
    const totalPts = filteredStats.reduce((sum, stat) => sum + stat.pts, 0);
    const totalAst = filteredStats.reduce((sum, stat) => sum + stat.ast, 0);
    const totalReb = filteredStats.reduce((sum, stat) => sum + stat.reb, 0);
    const averagePoints = totalPts / filteredStats.length;
    const averageAssists = totalAst / filteredStats.length;
    const averageRebounds = totalReb / filteredStats.length;
    const statsPoints = Math.round(averagePoints * 10) / 10;
    const statsAsst = Math.round(averageAssists * 10) / 10;
    const statsReb = Math.round(averageRebounds * 10) / 10;
    const statsGames = filteredStats.length;
    //settle promise and return object

    return {
      points: statsPoints,
      asst: statsAsst,
      reb: statsReb,
      games: statsGames,
    };
  } catch (error) {
    console.log(error);
  }
};

export default useFetchPlayer;
