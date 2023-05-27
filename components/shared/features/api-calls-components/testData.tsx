import React, { useEffect, useState } from "react";
import axios from "axios";
// Grab teams by abbr so that data is filtered out correctly leaving the ABL teams out
type Team = {
  team_id: number;
  team_abr: string;
  team_name: string;
  team_color: string;
  team_players: Player[];
};

type Player = {
  player_id: number;
};

const TestData = () => {
  const [teams, setTeams] = useState<Team[] | null>(null);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/teams",
    };

    axios
      .request(options)
      .then(function (response) {
        setTeams(response.data.data)
        // console.log(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
  return <div>{teams && teams.map((singleTeam, index) => {
  return (
    <h1>singleTeam</h1>
  )
})}</div>;
};

export default TestData;
