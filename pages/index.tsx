import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Icon } from '@iconify/react';

export default function MultiActionAreaCard() {
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
      <Card sx={{ maxWidth: 900 }}>
        <CardActionArea>
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
              The Crowds are up, their hands are down. Welcome to where the numbers matters now = NBA Post Season 22/23
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
          boxShadow: "20px 20px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Icon
          icon="fluent-emoji:basketball"
          style={{ fontSize: "50px" }}
        />
      </div>
    </div>
  );
}
