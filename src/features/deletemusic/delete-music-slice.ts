import { createSlice } from "@reduxjs/toolkit";

interface DeleteMusicState {
  deletedMusicId: number | null;
  deleteError: string | null;
  isPending: boolean;
}

const initialState: DeleteMusicState = {
  deletedMusicId: null, 
  deleteError: null,
  isPending: false,
};

export const deleteMusicSlice = createSlice({
  name: "deleteMusic",
  initialState,
  reducers: {
    deleteMusicRequested: (state, _action) => {
      state.deletedMusicId = _action.payload;
      state.isPending = true;
      state.deleteError = null;
    },
    deleteMusicSucceeded: (state) => {
      state.isPending = false;
      state.deletedMusicId = null;
      state.deleteError = null;
    },
    deleteMusicFailed: (state, action) => {
      state.deleteError = action.payload;
      state.deletedMusicId = null;
      state.isPending = false;
    },
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
  state.deleteMusic.isPending;
export const selectError = (state: { deleteMusic: DeleteMusicState }) =>
  state.deleteMusic.deleteError;

export default deleteMusicSlice.reducer;