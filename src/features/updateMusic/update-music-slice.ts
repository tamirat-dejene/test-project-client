import { createSlice } from "@reduxjs/toolkit";
import { Music } from "../../definitions/defn";

interface UpdateMusicState {
  updatedMusic: Music | null;
  updateError: string | null;
  updateIsPending: boolean;
}

const initialState: UpdateMusicState = {
  updatedMusic: null,
  updateError: null,
  updateIsPending: false,
};

export const updateMusicSlice = createSlice({
  name: "updateMusic",
  initialState,
  reducers: {
    updateMusicRequested: (state, action) => {
      state.updatedMusic = action.payload;
      state.updateIsPending = true;
    },
    updateMusicSucceeded: (state, action) => {
      state.updatedMusic = action.payload;
      state.updateIsPending = false;
    },
    updateMusicFailed: (state, action) => {
      state.updateError = action.payload;
      state.updateIsPending = false;
    },
    resetState: (state) => {
      state.updatedMusic = null;
      state.updateError = null;
      state.updateIsPending = false;
    }
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
  state.updateMusic.updateIsPending;
export const selectUpdateError = (state: { updateMusic: UpdateMusicState }) =>
  state.updateMusic.updateError;

export const resetUpdateMusicState = () => ({ type: "updateMusic/resetState" });

export default updateMusicSlice.reducer;