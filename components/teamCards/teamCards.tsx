import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  Box,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

import { Fjalla_One } from "@next/font/google";

const fjalla_one = Fjalla_One({
  subsets: ["latin"],
  weight: ["400"],
});

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

let gameData: Game[] = [];

const TeamCards = () => {
  const [games, setGames] = useState<Game[] | null>(null); //????a game array or NULL, start w/ null
  const [teamsArray, setTeamsArray] = useState<string[]>([]);
  const [teamRecords, setTeamRecords] = useState<{
    [key: string]: { wins: number; losses: number };
  }>({});
  const playersFromRedux = useAppSelector((state) => state.players.players);
  const teamInfoFromRedux = useAppSelector(
    (state) => state.teamInfo.teamInfo[0]
  );
  console.log(teamInfoFromRedux);
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
    const newTeamRecords: { [key: string]: { wins: number; losses: number } } =
      {};

    if (games) {
      games.forEach((game: Game) => {
        const { home_team_score, visitor_team_score, home_team, visitor_team } =
          game;

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
  const getLogoByTeamName = (teamFullName: string) => {
    const team = Object.values(teamInfoFromRedux).find(
      (team) => team.team_full_name === teamFullName
    );
    if (team) {
      return team.logo;
    }
    return null; // Team not found
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
    <>
      <div>
        <Typography
          className={`text-white bg-black font-bold text-center h-20 py-3 mb-0 ${fjalla_one.className}`}
          variant="h3"
        >
          NBA POSTSEASON 2022/23
        </Typography>
      </div>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: "center", padding: "2rem" }}
      >
        {teamsArray.map((team: string, index: number) => {
          // Get the team object from the teamLogos using the team name
          const teamObj = Object.values(teamInfoFromRedux).find(
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
                <div
                  className="flex items-center justify-end p-2"
                  style={{ backgroundColor: color }}
                >
                  <CardContent sx={{ padding: "10px" }} className="flex-1">
                    <Typography
                      component="div"
                      variant="h4"
                      className={`text-white font-bold rounded-md ${fjalla_one.className}`}
                    >
                      {team.toUpperCase()}
                    </Typography>
                    <Typography
                      component="div"
                      className={`text-white font-bold rounded-md ${fjalla_one.className}`}
                    >
                      ({teamRecord.wins} - {teamRecord.losses})
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    className="h-20 w-20 object-fill p-1"
                    image={logo}
                    alt="Team Logo"
                  />
                </div>

                <div className="flex-1 overflow-y-auto">
                  {teamPlayers.map((player: PlayerData) => (
                    <Typography component="div" key={player.id}>
                      <Link href={`/page2/${player.id}`} key={index}>
                        <Card sx={{ display: "flex", borderRadius: 0 }}>
                          <Button
                            sx={{
                              display: "flex",
                              color: "black",
                              width: "100%",
                              justifyContent: "left",
                            }}
                          >
                            <CardContent
                              sx={{
                                minWidth: "4rem",
                                color: "#AAAAAA",
                                fontFamily: fjalla_one.style.fontFamily,
                              }}
                            >
                              {player.position}
                            </CardContent>
                            <CardContent
                              sx={{
                                fontFamily: "sans-serif",
                                textTransform: "none",
                              }}
                            >
                              {player.first_name} {player.last_name}
                            </CardContent>
                          </Button>
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
    </>
  );
};

export default TeamCards;
