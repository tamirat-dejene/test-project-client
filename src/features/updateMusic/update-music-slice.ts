import { createSlice } from "@reduxjs/toolkit";
import { Music } from "../../definitions/defn";

interface UpdateMusicState {
  updatedMusic: Music | null;
  updateError: string | null;
  isPending: boolean;
}

const initialState: UpdateMusicState = {
  updatedMusic: null,
  updateError: null,
  isPending: false,
};

export const updateMusicSlice = createSlice({
  name: "updateMusic",
  initialState,
  reducers: {
    updateMusicRequested: (state, action) => {
      state.updatedMusic = action.payload;
      state.updateError = null;
      state.isPending = true;
    },
    updateMusicSucceeded: (state, action) => {
      state.updatedMusic = action.payload;
      state.updateError = null;
      state.isPending = false;
    },
    updateMusicFailed: (state, action) => {
      state.updateError = action.payload;
      state.updatedMusic = null;
      state.isPending = false;
    },
  },
});

export const {
  updateMusicRequested,
  updateMusicSucceeded,
  updateMusicFailed,
} = updateMusicSlice.actions;

export const selectUpdatedMusic = (state: { updateMusic: UpdateMusicState }) =>
  state.updateMusic.updatedMusic;

export const selectUpdating = (state: { updateMusic: UpdateMusicState }) =>
  state.updateMusic.isPending;

export const selectUpdateError = (state: { updateMusic: UpdateMusicState }) =>
  state.updateMusic.updateError;

export default updateMusicSlice.reducer;