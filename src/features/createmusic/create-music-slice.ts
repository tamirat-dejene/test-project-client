import { createSlice } from "@reduxjs/toolkit";
import { Music } from "../../definitions/defn";

interface NewMusicState {
  createdMusic: Music | null;
  createError: string | null;
  isPending: boolean;
}

const initialState: NewMusicState = {
  createdMusic: null,
  createError: null,
  isPending: false,
};

export const createMusicSlice = createSlice({
  name: "createMusic",
  initialState,
  reducers: {
    createMusicRequested: (state, action) => {
      state.createdMusic = action.payload;
      state.createError = null;
      state.isPending = true;
    },
    createMusicSucceeded: (state, action) => {
      state.createdMusic = action.payload;
      state.createError = null;
      state.isPending = false;
    },
    createMusicFailed: (state, action) => {
      state.createError = action.payload;
      state.createdMusic = null;
      state.isPending = false;
    },
  },
});

export const {
  createMusicRequested,
  createMusicSucceeded,
  createMusicFailed,
} = createMusicSlice.actions;

export const selectNewMusic = (state: { createMusic: NewMusicState }) =>
  state.createMusic.createdMusic;
export const selectError = (state: { createMusic: NewMusicState }) =>
  state.createMusic.createError;
export const selectCreating = (state: { createMusic: NewMusicState }) =>
  state.createMusic.isPending;

export default createMusicSlice.reducer;