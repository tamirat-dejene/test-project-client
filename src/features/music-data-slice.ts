import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music } from "../definitions/defn";

interface MusicDataState {
  musicList: Music[];
  sortOption: string;
  searchQuery: string;
  currentMusic: Music | null;
  deletedMusicId: number | null;

  created: boolean;
  updated: boolean;

  fetchIsPending: boolean;
  createIsPending: boolean;
  updateIsPending: boolean;
  deleteIsPending: boolean;

  musicDataError: string | null;
}

const initialState: MusicDataState = {
  musicList: [],
  sortOption: "",
  searchQuery: "",
  currentMusic: null,
  deletedMusicId: null,

  fetchIsPending: true,   // The first time page is loaded
  createIsPending: false,
  updateIsPending: false,
  deleteIsPending: false,

  created: false,
  updated: false,

  musicDataError: null,
};

// Default: every payload is an object
export const musicDataSlice = createSlice({
  name: "musicData",
  initialState,
  reducers: {
    // Fetch music data
    fetchMusicDataRequested: (state) => {
      state.fetchIsPending = true;
    },
    fetchMusicDataSucceeded: (
      state,
      action: PayloadAction<{ musicList: Music[] }>
    ) => {
      state.musicList = action.payload.musicList;
      state.fetchIsPending = false;
    },
    fetchMusicDataFailed: (
      state,
      action: PayloadAction<{ fetchError: string }>
    ) => {
      state.musicDataError = action.payload.fetchError;
      state.fetchIsPending = false;
    },
    resetFetchDataState: (state) => {
      state.musicList = [];
      state.sortOption = "";
      state.searchQuery = "";
      state.fetchIsPending = true;
    },

    // Create music
    createMusicRequested: (
      state,
      action: PayloadAction<{ newMusic: Music }>
    ) => {
      state.currentMusic = action.payload.newMusic;
      state.createIsPending = true;
    },
    createMusicSucceeded: (state, action: PayloadAction<{newMusic: Music}>) => {
      state.musicList.unshift(action.payload.newMusic);
      state.currentMusic = null;
      state.createIsPending = false;
      state.created = true;
    },
    createMusicFailed: (
      state,
      action: PayloadAction<{ createError: string }>
    ) => {
      state.musicDataError = action.payload.createError;
      state.createIsPending = false;
      state.currentMusic = null;
    },

    // Update music
    updateMusicRequested: (
      state,
      action: PayloadAction<{ updatedMusic: Music }>
    ) => {
      state.currentMusic = action.payload.updatedMusic;
      state.updateIsPending = true;
    },
    updateMusicSucceeded: (state) => {
      state.musicList = state.musicList.map((music) =>
        music.id === state.currentMusic?.id
          ? (state.currentMusic as Music)
          : music
      );
      state.currentMusic = null;
      state.updateIsPending = false;
      state.updated = true;
    },
    updateMusicFailed: (
      state,
      action: PayloadAction<{ updateError: string }>
    ) => {
      state.musicDataError = action.payload.updateError;
      state.updateIsPending = false;
      state.currentMusic = null;
    },

    // Delete music
    deleteMusicRequested: (
      state,
      _action: PayloadAction<{ deletedMusicId: number }>
    ) => {
      state.deletedMusicId = _action.payload.deletedMusicId;
      state.deleteIsPending = true;
    },
    deleteMusicSucceeded: (state) => {
      state.musicList = state.musicList.filter(
        (music) => music.id !== state.deletedMusicId
      );
      state.deleteIsPending = false;
      state.deletedMusicId = null;
    },
    deleteMusicFailed: (
      state,
      action: PayloadAction<{ deleteError: string }>
    ) => {
      state.musicDataError = action.payload.deleteError;
      state.deletedMusicId = null;
      state.deleteIsPending = false;
    },

    setSearchQuery: (state, action: PayloadAction<{ searchQuery: string }>) => {
      state.searchQuery = action.payload.searchQuery;
    },
    setSortOption: (state, action: PayloadAction<{ sortOption: string }>) => {
      state.sortOption = action.payload.sortOption;
    },
    setCreated: (state, action: PayloadAction<boolean>) => {
      state.created = action.payload;
    },
    setUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
    setMusicDataError: (state, action: PayloadAction<string | null>) => {
      state.musicDataError = action.payload;
    },
  },
});

export const {
  fetchMusicDataRequested,
  fetchMusicDataSucceeded,
  fetchMusicDataFailed,
  resetFetchDataState,

  createMusicRequested,
  createMusicSucceeded,
  createMusicFailed,
  updateMusicRequested,
  updateMusicSucceeded,
  updateMusicFailed,
  deleteMusicRequested,
  deleteMusicSucceeded,
  deleteMusicFailed,

  setSearchQuery,
  setSortOption,
  setCreated,
  setUpdated,
  setMusicDataError,
} = musicDataSlice.actions;

export const selectSearchQuery = (state: { musicData: MusicDataState }) =>
  state.musicData.searchQuery;

export const selectSortOption = (state: { musicData: MusicDataState }) =>
  state.musicData.sortOption;

export default musicDataSlice.reducer;
