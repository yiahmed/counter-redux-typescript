import React from "react";
import { Button } from "@mui/material";
import Home from "../../pages/index";

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
  return (
    <div className="w-full bg-black shadow-md flex justify-center items-center">
      <div className="py-2 space-x-5">
        <Button variant="outlined" href={"/"} sx={buttonStyling}>
          Home
        </Button>
        {/* <Button variant="outlined" href="/counter" sx={buttonStyling}>
          Counter
        </Button>
        <Button variant="outlined" href={"/page1"} sx={buttonStyling}>
          Other page
        </Button> */}
        <Button variant="outlined" href={"/nba-postseason"} sx={buttonStyling}>
          NBA Postseason 22/23
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
