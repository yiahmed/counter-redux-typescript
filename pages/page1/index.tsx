import React, { useEffect, useState } from "react";
import PlayerStat from "@/components/shared/features/api-calls-components/playerStat";
import axios from "axios";

const Page1 = () => {
  const [playerIds, setPlayerIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchPlayerIds = async () => {
      try {
        const response = await axios.get(
          "https://www.balldontlie.io/api/v1/players"
        );
        const players = response.data.data;
        const ids = players.map((player: any) => player.id);
        setPlayerIds(ids);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayerIds();
  }, []);

  return (
    <div className="text-black">
      <h1>Page 1</h1>
      {playerIds.map((playerId) => (
        <PlayerStat key={playerId} playerId={playerId} />
      ))}
    </div>
  );
};

export default Page1;
