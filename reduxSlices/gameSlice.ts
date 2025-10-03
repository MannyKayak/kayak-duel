import { GameState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GameState = {
  baseState: "idle",
  debug: true,
  endGameOverlay: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBaseState: (state, action: PayloadAction<GameState["baseState"]>) => {
      state.baseState = action.payload;
    },
    setEndGameOverlay: (state, action: PayloadAction<boolean>) => {
      state.endGameOverlay = action.payload;
    },
  },
});

export const { setBaseState, setEndGameOverlay } = gameSlice.actions;

export default gameSlice.reducer;
