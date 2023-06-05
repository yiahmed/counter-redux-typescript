import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@mui/material";
import { useRouter } from "next/router";
import { useAppSelector } from "@/components/hooks";
import PlayerStat from "@/components/playerStat/PlayerStat";
import { Fjalla_One } from "@next/font/google";


const fjalla_one = Fjalla_One({
  subsets: ["latin"],
  weight: ["400"],
});

type IndividualPlayer = {
  teamLogo: string | undefined;
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
    logo: string;
  };
};

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

const Index = () => {
  const [player, setPlayer] = useState<IndividualPlayer | null>(null);
  const [averagePts, setAveragePts] = useState<number>(0);
  const [averageAst, setAverageAst] = useState<number>(0);
  const [averageReb, setAverageReb] = useState<number>(0);
  const [totalGames, setTotalGames] = useState<number>(0);
  const teamInfoFromRedux = useAppSelector(
    (state) => state.teamInfo.teamInfo[0]
  );
  const router = useRouter();
  const { playerId } = router.query;

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://www.balldontlie.io/api/v1/players/${playerId}`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        const playerData: IndividualPlayer = response.data;
        playerData.teamLogo = playerData.team.logo;
        setPlayer(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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
        setAveragePts(Math.round(averagePoints * 10) / 10);
        setAverageAst(Math.round(averageAssists * 10) / 10);
        setAverageReb(Math.round(averageRebounds * 10) / 10);
        setTotalGames(filteredStats.length);
        console.log("Average Points per Game:", averagePoints);
        console.log("Total Games Played:", filteredStats.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const showHeight = () => {
    if (player && player.height_feet && player.height_inches) {
      return `${player.height_feet}' ${player.height_inches}"`;
    } else {
      return "N/A";
    }
  };
  const teamObj = Object.values(teamInfoFromRedux).find(
    (teamData) => teamData.team_full_name === player?.team?.full_name
  );

  const teamLogo = teamObj ? teamObj.logo : "";
  const teamColor = teamObj ? teamObj.color : "";
  const gradientColor = `linear-gradient(to bottom, ${teamColor} 20%, rgba(0, 0, 0, 0) 160%)`;

  return (
    <div className="flex items-center justify-center w-full h-full rounded-sm shadow-2xl">
      {player && (
        <div className="flex flex-col w-1/2   shadow-2xl h 1/2  ">
          <div
            style={{
              background: gradientColor,
            }}
            className={`flex items-center text-4xl font-bold ${fjalla_one.className} text-white  border-b   h-1/5 px-7 py-4 rounded-t-xl`}
          >
            <div className="w-2/3">
              {player.first_name.toUpperCase() + " " + player.last_name.toUpperCase()}
            </div>
            <div className="w-1/3 ">
              {player.team && (
                <img
                  src={teamLogo}
                  alt={player.team.abbreviation}
                  className="w-20 h-20 float-right"
                />
              )}
            </div>
          </div>
          <div style={{ background: "white", color: "black" }}>
            <div
              className={`p-4 text-lg  text-black ${fjalla_one.className} justify-end flex-row flex`}
            >
              <div className="p-5 min-h-full w-1/2 ">
              <div className="flex justify-center items-center ">
                <img src="https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg"
                className="h-5/6 w-5/6 object-fill"></img>
              </div>
              </div>
              <div className="">
              <PlayerStat label="HEIGHT" value={showHeight()} />
              <PlayerStat label="POSITION" value={player.position ?? "N/A"} />
              <PlayerStat label="POINTS PER GAME" value={averagePts} />
              </div>
              <div className="">
              <PlayerStat label="ASSISTS PER GAME" value={averageAst} />
              <PlayerStat label="REBOUNDS PER GAME" value={averageReb} />
              <PlayerStat label="GAMES PLAYED" value={totalGames} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
