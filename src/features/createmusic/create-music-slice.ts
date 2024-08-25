import { createSlice } from "@reduxjs/toolkit";
import { Music } from "../../definitions/defn";

interface NewMusicState {
  createdMusic: Music | null;
  createError: string | null;
  createIsPending: boolean;
}

const initialState: NewMusicState = {
  createdMusic: null,
  createError: null,
  createIsPending: false,
};

export const createMusicSlice = createSlice({
  name: "createMusic",
  initialState,
  reducers: {
    createMusicRequested: (state, action) => {
      state.createdMusic = action.payload;
      state.createIsPending = true;
    },
    createMusicSucceeded: (state, action) => {
      state.createdMusic = action.payload;
      state.createIsPending = false;
    },
    createMusicFailed: (state, action) => {
      state.createError = action.payload;
      state.createIsPending = false;
    },

    resetState: (state) => {
      state.createdMusic = null;
      state.createError = null;
      state.createIsPending = false;
    }
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
  state.createMusic.createIsPending;

export const resetCreateMusicState = () => ({ type: "createMusic/resetState" });

export default createMusicSlice.reducer;