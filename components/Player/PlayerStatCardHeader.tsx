import React from "react";
import { Fjalla_One } from "@next/font/google";
import Image from "next/image";
import useShowHeight from "../hooks/useShowHeight";
import PlayerStat from "../playerStat/PlayerStat";

type Props = {
  player: any;
  points: number;
  asst: number;
  reb: number;
  games: number;
};
const fjalla_one = Fjalla_One({
  subsets: ["latin"],
  weight: ["400"],
});

const PlayerStatCardHeader = ({ player, points, asst, reb, games }: Props) => {
  return (
    <div
      className={`p-4 text-lg  text-black ${fjalla_one.className} justify-end flex-row flex`}
    >
      <div className="p-5 min-h-full w-1/2 ">
        <div className="flex justify-center items-center ">
          <Image
            src="https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg"
            alt="Profile"
            width={300} // Replace 300 with the desired width of the image
            height={200} // Replace 200 with the desired height of the image
          ></Image>
        </div>
      </div>
      <div className="">
        <PlayerStat label="HEIGHT" value={useShowHeight(player)} />
        <PlayerStat label="POSITION" value={player.position ?? "N/A"} />
        <PlayerStat label="POINTS PER GAME" value={points} />
      </div>
      <div className="">
        <PlayerStat label="ASSISTS PER GAME" value={asst} />
        <PlayerStat label="REBOUNDS PER GAME" value={reb} />
        <PlayerStat label="GAMES PLAYED" value={games} />
      </div>
    </div>
  );
};

export default PlayerStatCardHeader;
