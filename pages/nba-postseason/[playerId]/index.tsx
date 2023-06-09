import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Card } from "@mui/material";
import { useRouter } from "next/router";
import { useAppSelector } from "@/components/hooks";
import PlayerStat from "@/components/playerStat/PlayerStat";
import { Fjalla_One } from "@next/font/google";
import PlayerStatCardHeader from "@/components/Player/PlayerStatCardHeader";
import useFetchPlayer from "@/components/hooks/useFetchPlayer";

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
    if (playerId) {
      const statsToUse = useFetchPlayer(playerId) as any;
      console.log("statsToUse", statsToUse);

      //get promise results

      // console.log("trss", statsToUse);
      // setAveragePts(statsToUse.points);
      // setAverageAst(statsToUse.asst);
      // setAverageReb(statsToUse.reb);
      // setTotalGames(statsToUse.games);
    }
  }, []);

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
              {player.first_name.toUpperCase() +
                " " +
                player.last_name.toUpperCase()}
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
            <PlayerStatCardHeader
              player={player}
              points={averagePts}
              asst={averageAst}
              reb={averageReb}
              games={totalGames}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
