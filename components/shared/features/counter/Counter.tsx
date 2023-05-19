import React, { useState } from "react";
import { increment, decrement, incrementByAmount } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "@/components/hooks";
import Button from "@mui/material/Button";
import { Action } from "@reduxjs/toolkit";
import Count from "./counter-components/Count";

export function Counter() {
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState("0");
  const incrementValue = Number(incrementAmount) || 0;
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div>
        <Button variant="outlined" color="error" onClick={() => dispatch(decrement())}>
          -
        </Button>
        <Count />
        <Button
          variant="outlined"
          color="success"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </div>
      <div className="my-3 space-x-3">
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          className="shadow-md border-2 border-gray-400 rounded"
        />
        <Button variant="outlined" onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </Button>
      </div>
    </div>
  );
}
