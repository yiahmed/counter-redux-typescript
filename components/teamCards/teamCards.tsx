import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addPlayers } from "../shared/features/players/playerSlice";
import {
  Box,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import {Fjalla_One} from '@next/font/google'

const fjalla_one = Fjalla_One({
  subsets:['latin'],
  weight:['400']
})

console.log('team card',fjalla_one)

interface Game {
  id: number;
  date: string;
  home_team: Team;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: Team;
  visitor_team_score: number;
}

interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

type PlayerData = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team_id: number;
};

let gameData: Game[] = [
  // ... (your game data array here)
];
const teamLogos = {
  ATL: {
    team_full_name: "Atlanta Hawks",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg",
    color: "#E03A3E",
    id: 1
  },
  BOS: {
    logo: "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
    color: "#007A33",
    team_full_name: "Boston Celtics",
    id: 2
  },
  BKN: {
    logo: "https://patch.com/img/cdn/users/68453/2012/05/raw/842b4607fd503508899d7e15b062a4d5.jpg",
    color: "#000000",
    team_full_name: "Brooklyn Nets",
    id: 3
  },
  CHA: {
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg",
    color: "#1D1160",
    team_full_name: "Charlotte Hornets",
    id: 4
  },
  CHI: {
    logo: "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg",
    color: "#CE1141",
    team_full_name: "Chicago Bulls",
    id: 5
  },
  CLE: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cleveland_Cavaliers_secondary_logo.svg/2373px-Cleveland_Cavaliers_secondary_logo.svg.png",
    color: "#860038",
    team_full_name: "Cleveland Cavaliers",
    id: 6
  },
  DAL: {
    logo: "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg",
    color: "#00538C",
    team_full_name: "Dallas Mavericks",
    id: 7
  },
  DEN: {
    logo: "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg",
    color: "#0E2240",
    team_full_name: "Denver Nuggets",
    id: 8
  },
  DET: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Pistons_logo17.svg",
    color: "#C8102E",
    team_full_name: "Detroit Pistons",
    id: 9
  },
  GSW: {
    team_full_name: "Golden State Warriors",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg",
    color: "#1D428A",
    id: 10
  },
  HOU: {
    logo: "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg",
    color: "#CE1141",
    team_full_name: "Houston Rockets",
    id: 11
  },
  IND: {
    logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg",
    color: "#002D62",
    team_full_name: "Indiana Pacers",
    id: 12
  },
  LAC: {
    logo: "https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_%282015%29.svg",
    color: "#C8102E",
    team_full_name: "LA Clippers",
    id: 13
  },
  LAL: {
    team_full_name: "Los Angeles Lakers",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
    color: "#552583",
    id: 14
  },
  MEM: {
    team_full_name: "Memphis Grizzlies",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg",
    color: "#5D76A9",
    id: 15
  },
  MIA: {
    color: "#98002E",
    team_full_name: "Miami Heat",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg",
    id: 16
  },
  MIL: {
    team_full_name: "Milwaukee Bucks",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg",
    color: "#00471B",
    id: 17
  },
  MIN: {
    team_full_name: "Minnesota Timberwolves",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg",
    color: "#0C2340",
    id: 18
  },
  NOP: {
    team_full_name: "New Orleans Pelicans",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg",
    color: "#85714D",
    id: 19
  },
  NYK: {
    team_full_name: "New York Knicks",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg",
    color: "#F58426",
    id: 20
  },
  OKC: {
    team_full_name: "Oklahoma City Thunder",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg",
    color: "#007AC1",
    id: 21
  },
  ORL: {
    team_full_name: "Orlando Magic",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg",
    color: "#0077C0",
    id: 22
  },
  PHI: {
    team_full_name: "Philadelphia 76ers",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg",
    color: "#006BB6",
    id: 23
  },
  PHX: {
    team_full_name: "Phoenix Suns",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg",
    color: "#1D1160",
    id: 24
  },
  POR: {
    team_full_name: "Portland Trail Blazers",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg",
    color: "#E03A3E",
    id: 25
  },
  SAC: {
    team_full_name: "Sacramento Kings",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg",
    color: "#5A2D81",
    id: 26
  },
  SAS: {
    team_full_name: "San Antonio Spurs",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg",
    color: "#C4CED4",
    id: 27
  },
  TOR: {
    team_full_name: "Toronto Raptors",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg",
    color: "#CE1141",
    id: 28
  },
  UTA: {
    team_full_name: "Utah Jazz",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/04/Utah_Jazz_logo_%282016%29.svg",
    color: "#002B5C",
    id: 29
  },
  WAS: {
    team_full_name: "Washington Wizards",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg",
    color: "#002B5C",
    id: 30
  },
};
const getTeamLogo = (teamName: string) => {
  const team = Object.values(teamLogos).find(
    (team) => team.team_full_name === teamName
  );

  return team ? team.logo : "";
};
const TeamCards = () => {
  const [games, setGames] = useState<Game[] | null>(null); //????a game array or NULL, start w/ null
  const [teamsArray, setTeamsArray] = useState<string[]>([]);
  const [teamRecords, setTeamRecords] = useState<{ [key: string]: { wins: number; losses: number } }>({});
  const playersFromRedux = useAppSelector((state) => state.players.players);
  const playersByTeam: { [key: number]: PlayerData[] } = {};
  playersFromRedux.forEach((player: PlayerData) => {
    const { team_id } = player;

    if (playersByTeam[team_id]) {
      playersByTeam[team_id].push(player);
    } else {
      playersByTeam[team_id] = [player];
    }
  });

  const calculateTeamRecords = () => {
    const newTeamRecords: { [key: string]: { wins: number; losses: number } } = {};

    if (games) {
      games.forEach((game: Game) => {
        const { home_team_score, visitor_team_score, home_team, visitor_team } = game;

        // Determine the winner and loser
        let winner, loser;
        if (home_team_score > visitor_team_score) {
          winner = home_team.full_name;
          loser = visitor_team.full_name;
        } else if (home_team_score < visitor_team_score) {
          winner = visitor_team.full_name;
          loser = home_team.full_name;
        } else {
          return; // Skip this game if it's a tie
        }

        // Update winner's record
        if (!newTeamRecords[winner]) {
          newTeamRecords[winner] = { wins: 1, losses: 0 };
        } else {
          newTeamRecords[winner].wins += 1;
        }

        // Update loser's record
        if (!newTeamRecords[loser]) {
          newTeamRecords[loser] = { wins: 0, losses: 1 };
        } else {
          newTeamRecords[loser].losses += 1;
        }
      });
    }

    setTeamRecords(newTeamRecords);
  };

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(
          "https://www.balldontlie.io/api/v1/games",
          {
            params: {
              per_page: "100",
              "seasons[]": "2022",
              postseason: "true",
            },
          }
        );
        const gameData: Game[] = response.data.data;
        setGames(gameData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGameData();
  }, []);

  useEffect(() => {
    if (games) {
      const uniqueTeams: string[] = games.reduce(
        (accumulator: string[], game: Game) => {
          const homeTeamFullName = game.home_team.full_name;
          const visitorTeamFullName = game.visitor_team.full_name;

          if (!accumulator.includes(homeTeamFullName)) {
            accumulator.push(homeTeamFullName);
          }
          if (!accumulator.includes(visitorTeamFullName)) {
            accumulator.push(visitorTeamFullName);
          }

          return accumulator;
        },
        []
      );

      setTeamsArray(uniqueTeams);
    }
  }, [games]); //[games] array is provided as the second argument. By doing this, you're telling React that the effect should run whenever the games state changes

  useEffect(() => {
    calculateTeamRecords();
  }, [games]);



  return (
    <Grid container spacing={3} sx={{ justifyContent: "center", padding: "2rem" }}>
      {teamsArray.map((team: string, index: number) => {
        // Get the team object from the teamLogos using the team name
        const teamObj = Object.values(teamLogos).find(
          (teamData) => teamData.team_full_name === team
        );
  
        if (!teamObj) return null; // Skip if team object is not found
  
        const { logo, color } = teamObj;
  
        // Get the players for the current team
        const teamPlayers = playersByTeam[teamObj.id] || [];
  
        const teamRecord = teamRecords[team] || { wins: 0, losses: 0 };
  
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="flex flex-col max-h-80">
              <div className="flex items-center justify-end p-2" style={{ backgroundColor: color }}>
                <CardContent sx={{padding:"10px"}}className="flex-1">
                  <Typography component="div" variant="h4" className={`text-white font-bold rounded-md ${fjalla_one.className}`}>
                    {team.toUpperCase()}
                  </Typography>
                  <Typography component="div" className={`text-white font-bold rounded-md ${fjalla_one.className}`}>
                    ({teamRecord.wins} - {teamRecord.losses})
                  </Typography>
                </CardContent>
                <CardMedia component="img" className="h-20 w-20 object-fill p-1" image={logo} alt="Team Logo" />
              </div>
  
              <div className="flex-1 overflow-y-auto">
                {teamPlayers.map((player: PlayerData) => (
                  <Typography component="div" key={player.id}>
                    <Link href={`/page2/${player.id}`} key={index}>
                      <Card sx={{ display: "flex", borderRadius: 0 }}>
                        <CardContent sx={{ minWidth: "4rem", color: "#AAAAAA", fontFamily: fjalla_one.style.fontFamily }}>{player.position}</CardContent>
                        <CardContent>{player.first_name} {player.last_name}</CardContent>
                      </Card>
                    </Link>
                  </Typography>
                ))}
              </div>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
  
};

export default TeamCards;