import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Icon } from "@iconify/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Button from "@mui/material/Button";

export default function MultiActionAreaCard() {
  const { user, error, isLoading } = useUser();
  console.log(user);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Card sx={{ maxWidth: 900, marginTop: 3 }}>
        <CardActionArea href={"/nba-postseason"}>
          <CardMedia
            component="img"
            height="full"
            image="/Billboard.jpeg"
            alt="Basketball Billboard"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Welcome to The Billboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The Crowds are up, their hands are down. Welcome to where the
              numbers matter now = NBA Post Season 22/23
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <Icon icon="fluent-emoji:basketball" style={{ fontSize: "50px" }} />
        {!user && (
          <div className="mx-4">
            <Button variant="contained" href="/api/auth/login">
              <Typography>Login</Typography>
            </Button>
          </div>
        )}
        {user && (
          <div className="text-black mx-4">
            <span className="mx-4 text-2xl">Welcome {user.name}!</span>
            <Button variant="contained" href="/api/auth/logout">
              <Typography>Logout</Typography>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
