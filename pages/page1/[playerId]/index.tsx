import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@mui/material';
import { useRouter } from 'next/router';

type IndividualPlayer = {
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
  };
};

const Index = () => {
  const [player, setPlayer] = useState<IndividualPlayer | null>(null);
  const router = useRouter();
  const { playerId } = router.query;
  const teamColor = {
ATL: '#C8102E',
BOS: '#007A33',
BKN: '#000000',
CHA: '#1D1160',
CHI: '#CE1141',
CLE: '#860038',
DAL: '#00538C',
DEN: '#0E2240',
DET: '#C8102E',
GSW: '#1D428A',
HOU: '#CE1141',
IND: '#002D62',
LAC: '#C8102E',
LAL: '#552583',
MEM: '#5D76A9',
MIA: '#98002E',
MIL: '#00471B',
MIN: '#0C2340',
NOP: '#85714D',
NYK: '#F58426',
OKC: '#007AC1',
ORL: '#0077C0',
PHI: '#006BB6',
PHX: '#1D1160',
POR: '#E03A3E',
SAC: '#5A2D81',
SAS: '#C4CED4',
TOR: '#CE1141',
UTA: '#002B5C',
WAS: '#002B5C'
  }
  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://www.balldontlie.io/api/v1/players/${playerId}`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setPlayer(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const showHeight = () => {
    if (player && player.height_feet && player.height_inches) {
      return (
        <li className="my-4">
          HEIGHT: {player.height_feet}' {player.height_inches}"
        </li>
      );
    } else {
      return <li className="my-4">HEIGHT: N/A</li>;
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      {player && (
        <div className="flex flex-col w-1/2 border-2 rounded-md shadow-md h-1/2">
        <div className="flex items-center justify-center text-lg font-bold text-white bg-black border-b rounded-t-md h-1/5">
          {player.first_name + ' ' + player.last_name}
        </div>
        <div>
          <ul className="p-4 text-lg italic text-black">
            {showHeight()}
            <li className="my-4">POSITION: {player.position ?? 'N/A'}</li>
            <li className="my-4">
              TEAM: {player.team?.abbreviation ?? 'N/A'}
            </li>
          </ul>
        </div>
      </div>
      )}
    </div>
  );
};

export default Index;
