import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./shared/features/counter/counterSlice";
import playersReducer from "./shared/features/players/playerSlice";
import teamInfoReducer from "./shared/features/teams/teamInfoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    players: playersReducer,
    teamInfo: teamInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type Appthunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
