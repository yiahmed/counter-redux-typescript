import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Box,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

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

let gameData: Game[] = [
  // ... (your game data array here)
];
const teamLogos = {
  ATL: {
    team_full_name: "Atlanta Hawks",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg",
    color: "#E03A3E",
  },
  BOS: {
    logo: "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
    color: "#007A33",
    team_full_name: "Boston Celtics",
  },
  BKN: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg",
    color: "#000000",
    team_full_name: "Brooklyn Nets",
  },
  CHA: {
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg",
    color: "#1D1160",
    team_full_name: "Charlotte Hornets",
  },
  CHI: {
    logo: "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg",
    color: "#CE1141",
    team_full_name: "Chicago Bulls",
  },
  CLE: {
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4b/Cleveland_Cavaliers_logo.svg",
    color: "#860038",
    team_full_name: "Cleveland Cavaliers",
  },
  DAL: {
    logo: "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg",
    color: "#00538C",
    team_full_name: "Dallas Mavericks",
  },
  DEN: {
    logo: "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg",
    color: "#0E2240",
    team_full_name: "Denver Nuggets",
  },
  DET: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Pistons_logo17.svg",
    color: "#C8102E",
    team_full_name: "Detroit Pistons",
  },
  GSW: {
    team_full_name: "Golden State Warriors",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg",
    color: "#1D428A",
  },
  HOU: {
    logo: "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg",
    color: "#CE1141",
    team_full_name: "Houston Rockets",
  },
  IND: {
    logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg",
    color: "#002D62",
    team_full_name: "Indiana Pacers",
  },
  LAC: {
    logo: "https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_%282015%29.svg",
    color: "#C8102E",
    team_full_name: "Los Angeles Clippers",
  },
  LAL: {
    team_full_name: "Los Angeles Lakers",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
    color: "#552583",
  },
  MEM: {
    team_full_name: "Memphis Grizzlies",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg",
    color: "#5D76A9",
  },
  MIA: {
    "#98002E": "#98002E",
    team_full_name: "Miami Heat",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg",
  },
  MIL: {
    team_full_name: "Milwaukee Bucks",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg",
    color: "#00471B",
  },
  MIN: {
    team_full_name: "Minnesota Timberwolves",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg",
    color: "#0C2340",
  },
  NOP: {
    team_full_name: "New Orleans Pelicans",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg",
    color: "#85714D",
  },
  NYK: {
    team_full_name: "New York Knicks",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg",
    color: "#F58426",
  },
  OKC: {
    team_full_name: "Oklahoma City Thunder",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg",
    color: "#007AC1",
  },
  ORL: {
    team_full_name: "Orlando Magic",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg",
    color: "#0077C0",
  },
  PHI: {
    team_full_name: "Philadelphia 76ers",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg",
    color: "#006BB6",
  },
  PHX: {
    team_full_name: "Phoenix Suns",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg",
    color: "#1D1160",
  },
  POR: {
    team_full_name: "Portland Trail Blazers",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg",
    color: "#E03A3E",
  },
  SAC: {
    team_full_name: "Sacramento Kings",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg",
    color: "#5A2D81",
  },
  SAS: {
    team_full_name: "San Antonio Spurs",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg",
    color: "#C4CED4",
  },
  TOR: {
    team_full_name: "Toronto Raptors",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg",
    color: "#CE1141",
  },
  UTA: {
    team_full_name: "Utah Jazz",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/04/Utah_Jazz_logo_%282016%29.svg",
    color: "#002B5C",
  },
  WAS: {
    team_full_name: "Washington Wizards",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg",
    color: "#002B5C",
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
  console.log(teamsArray);

  return (
    <Grid container spacing={3} justifyContent="center">
      {teamsArray.map((team: string, index: number) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="div" variant="h5">
                  {team}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {team}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                className="h-1/5 w-1/4"
                image={getTeamLogo(team)}
                alt="Team Logo"
              />
            </Box>

            <CardContent sx={{ flex: 1 }}>
              <Typography component="div">PLAYER NAME</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamCards;