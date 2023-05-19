import React, { useState } from "react";
import {
  increment,
  decrement,
  incrementByAmount,
  selectCount,
} from "./counterSlice";
import { useAppDispatch, useAppSelector } from "@/components/hooks";


export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState("0");
  const incrementValue = Number(incrementAmount) || 0;
  return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span style={{ color: "blue" }}>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </button>
      </div>
    </div>
  );
}
