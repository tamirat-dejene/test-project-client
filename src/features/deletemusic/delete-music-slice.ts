import { createSlice } from "@reduxjs/toolkit";

interface DeleteMusicState {
  deletedMusicId: number | null;
  deleteError: string | null;
  deleteIsPending: boolean;
}

const initialState: DeleteMusicState = {
  deletedMusicId: null, 
  deleteError: null,
  deleteIsPending: false,
};

export const deleteMusicSlice = createSlice({
  name: "deleteMusic",
  initialState,
  reducers: {
    deleteMusicRequested: (state, _action) => {
      state.deletedMusicId = _action.payload;
      state.deleteIsPending = true;
    },
    deleteMusicSucceeded: (state) => {
      state.deleteIsPending = false;
    },
    deleteMusicFailed: (state, action) => {
      state.deleteError = action.payload;
      state.deletedMusicId = null;
      state.deleteIsPending = false;
    },
    resetState: (state) => {
      state.deletedMusicId = null;
      state.deleteError = null;
      state.deleteIsPending = false;
    }
  },
});

export const {
  deleteMusicRequested,
  deleteMusicSucceeded,
  deleteMusicFailed,
} = deleteMusicSlice.actions;

export const selectDeletedMusic = (state: { deleteMusic: DeleteMusicState }) =>
  state.deleteMusic.deletedMusicId;
export const selectDeleting = (state: { deleteMusic: DeleteMusicState }) =>
  state.deleteMusic.deleteIsPending;
export const selectError = (state: { deleteMusic: DeleteMusicState }) =>
  state.deleteMusic.deleteError;

export const resetDeleteMusicState = () => ({ type: "deleteMusic/resetState" });

export default deleteMusicSlice.reducer;