import React from "react";
import { Button } from "@mui/material";
import Home from "../../pages/index";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="w-full bg-white border-2 shadow-md flex justify-center items-center">
      <div className="py-2 space-x-5">
        <Button variant="outlined" href={"/"}>
          Homey
        </Button>
        <Button variant="outlined" href="/counter">
          Counter
        </Button>
        <Button variant="outlined" href={"/page1"}>
          Page1
        </Button>
        <Button variant="outlined" href={"/page2"}>
          NBA Postseason 22/23
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
