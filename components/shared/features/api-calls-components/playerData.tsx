import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Card } from "@mui/material";

type Player = {
  id:number,
  ast:number,
  blk:number,
  dreb:number,
  fg3_pct:number,
  fg3a:number,
  fg3m:number,
  fg_pct:number,
  fga:number,
  fgm:number,
  ft_pct:number,
  fta:number,
  ftm:number,
  game:{
    id:number,
    date:string,
    home_team_id:number,
    home_team_score:number,
    season:number,
    visitor_team_id:number,
    visitor_team_score:number
  },
  min:string,
  oreb:number,
  pf:number,
  player:{
    id:number,
    first_name:string,
    last_name:string,
    position:string,
    team_id:number
  },
  pts:number,
  reb:number,
  stl:number,
  team:{
    id:number,
    abbreviation:string,
    city:string,
    conference:string,
    division:string,
    full_name:string,
    name:string
  },
  turnover:number
};

const PlayerData = () => {
  const [players, setPlayers] = useState<Player[] | null>(null);;
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://www.balldontlie.io/api/v1/stats',
      params: {postseason: 'true', per_page: '100', 'seasons[]': '2022'}
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data.data);
      setPlayers(response.data.data)
    }).catch(function (error) {
      console.error(error);
    });
  }, [])
  return (
    <div className="text-black flex flex-col justify-center items-center">
      <h1 className="text-3xl">2022 NBA Postseason Player Data</h1>
      <Card className="flex flex-col w-1/2 h-60 overflow-auto justify-center items-center">
        {players && players.map((singlePlayer, index) => {
          return (
            <Link href={`/page1/${singlePlayer.player.id}`} key={index}>
              {singlePlayer.player.first_name + " " + singlePlayer.player.last_name}
            </Link>
          );
        })}
      </Card>
    </div>
  );
};

export default PlayerData;
