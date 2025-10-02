import { GameState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GameState = {
  baseState: "idle",
  debug: true,
  endGameOverlay: true,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBaseState: (state, action: PayloadAction<GameState["baseState"]>) => {
      state.baseState = action.payload;
    },
  },
});

export const { setBaseState } = gameSlice.actions;

export default gameSlice.reducer;
