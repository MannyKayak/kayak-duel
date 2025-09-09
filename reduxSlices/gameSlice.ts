import { GameState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GameState = {
  baseState: "idle",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBaseState: (state, action: PayloadAction<GameState>) => {
      state.baseState = action.payload.baseState;
    },
  },
});

export const { setBaseState } = gameSlice.actions;

export default gameSlice.reducer;
