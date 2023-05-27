import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

export interface PlayersState {
  players: any[];
  status: "idle" | "loading" | "failed";
}

const initialState: PlayersState = {
  players: [],
  status: "idle",
};
//createSlice({name, state, reducer{...}})
export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayers: (state, action: PayloadAction<PlayerData[]>) => {
      state.players = action.payload;
    },
  },
});

export const { addPlayers } = playersSlice.actions;

export default playersSlice.reducer;