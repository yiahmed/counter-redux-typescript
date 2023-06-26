import React from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Home from "../../pages/index";
import { useUser } from "@auth0/nextjs-auth0/client";

type Props = {};

const buttonStyling = {
  borderColor: "white",
  color: "white",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    borderColor: "white",
    boxShadow: "0 5px 15px rgba(145, 92, 182, .4);",
  },
};

const Navbar = (props: Props) => {
  const { user, error, isLoading } = useUser();
  console.log(user);

  return (
    <div className="w-full bg-black shadow-md flex justify-center items-center">
      <div className="py-2 space-x-5">
        <Button variant="outlined" href={"/"} sx={buttonStyling}>
          Home
        </Button>
        <Button variant="outlined" href={"/nba-postseason"} sx={buttonStyling}>
          NBA Postseason 22/23
        </Button>
      </div>
      <div>
        {!user && (
          <div className="mx-4">
            <Button
              variant="outlined"
              sx={buttonStyling}
              href="/api/auth/login"
            >
              <Typography>Login</Typography>
            </Button>
          </div>
        )}
        {user && (
          <div className="text-white mx-4 flex items-center">
            <span className="mx-4 text-xl">Welcome {user.name}!</span>
            <Button
              variant="outlined"
              sx={buttonStyling}
              href="/api/auth/logout"
            >
              <Typography>Logout</Typography>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
