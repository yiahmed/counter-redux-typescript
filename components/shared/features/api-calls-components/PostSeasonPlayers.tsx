import React from "react";
import { useAppSelector } from "@/components/hooks";

type PlayerData = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team_id: number;
};

type TestPlayerProps = {
  postSeasonPlayers: PlayerData[];
};

const PostSeasonPlayers = () => {
  const playersFromRedux = useAppSelector((state) => state.players);

  const renderPlayerNames = () => {
    if (playersFromRedux && playersFromRedux.players && playersFromRedux.players.length > 0) {
      return playersFromRedux.players.map((player: PlayerData) => (
        <div key={player.id}>
          <span>{player.first_name} </span>
          <span>{player.last_name}</span>
        </div>
      ));
    } else {
      return <div>No players found.</div>;
    }
  };

  return (
    <div>
      <h2>Player Names:</h2>
      {renderPlayerNames()}
    </div>
  );
};

export default PostSeasonPlayers;
