import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music } from "../definitions/defn";

interface MusicDataState {
  musicData: Music[];
  sortOption: string;
  searchQuery: string;
  
  createdMusic: Music | null;
  updatedMusic: Music | null;
  deletedMusicId: number | null;
  
  loading: boolean;
  createIsPending: boolean;
  updateIsPending: boolean;
  deleteIsPending: boolean;

  musicDataError: string | null;
}

const initialState: MusicDataState = {
  musicData: [],
  sortOption: "",
  searchQuery: "",
  
  createdMusic: null,
  updatedMusic: null,
  deletedMusicId: null,
  
  loading: true,
  createIsPending: false,
  updateIsPending: false,
  deleteIsPending: false,

  musicDataError: null,
};

// Default: every payload is an object
export const musicDataSlice = createSlice({
  name: "musicData",
  initialState,
  reducers: {
    // Search qury setter
    setSearchQuery: (state, action: PayloadAction<{ searchQuery: string }>) => {
      state.searchQuery = action.payload.searchQuery;
    },

    // Sort option setter
    setSortOption: (state, action: PayloadAction<{ sortOption: string }>) => {
      state.sortOption = action.payload.sortOption;
    },

    // Fetch music data
    fetchMusicDataRequested: (state) => {
      state.loading = true;
    },
    fetchMusicDataSucceeded: (
      state,
      action: PayloadAction<{ musicList: Music[] }>
    ) => {
      state.musicData = action.payload.musicList;
      state.loading = false;
    },
    fetchMusicDataFailed: (
      state,
      action: PayloadAction<{ fetchError: string }>
    ) => {
      state.musicDataError = action.payload.fetchError;
      state.loading = false;
    },
    resetFetchDataState: (state) => {
      state.musicData = [];
      state.sortOption = "";
      state.searchQuery = "";
      state.loading = true;
      state.musicDataError = null;
    },

    // Create music
    createMusicRequested: (
      state,
      action: PayloadAction<{ newMusic: Music }>
    ) => {
      state.createdMusic = action.payload.newMusic;
      state.createIsPending = true;
    },
    createMusicSucceeded: (
      state,
      action: PayloadAction<{ newMusic: Music }>
    ) => {
      state.createdMusic = action.payload.newMusic;
      state.musicData.unshift(action.payload.newMusic);
      state.createIsPending = false;
    },
    createMusicFailed: (
      state,
      action: PayloadAction<{ createError: string }>
    ) => {
      state.musicDataError = action.payload.createError;
      state.createIsPending = false;
    },
    resetCreateMusicState: (state) => {
      state.createdMusic = null;
      state.musicDataError = null;
      state.createIsPending = false;
    },

    // Update music
    updateMusicRequested: (
      state,
      action: PayloadAction<{ updatedMusic: Music }>
    ) => {
      state.updatedMusic = action.payload.updatedMusic;
      state.updateIsPending = true;
      state.musicDataError = null;
    },
    updateMusicSucceeded: (
      state,
      action: PayloadAction<{ updatedMusic: Music }>
    ) => {
      state.musicData = state.musicData.map((music) =>
        music.id === action.payload.updatedMusic.id
          ? action.payload.updatedMusic
          : music
      );
      state.updateIsPending = false;
    },
    updateMusicFailed: (
      state,
      action: PayloadAction<{ updateError: string }>
    ) => {
      state.musicDataError = action.payload.updateError;
      state.updateIsPending = false;
    },
    resetUpdateMusicState: (state) => {
      state.updatedMusic = null;
      state.musicDataError = null;
      state.updateIsPending = false;
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
      state.deleteIsPending = false;
      state.musicData = state.musicData.filter(
        (music) => music.id !== state.deletedMusicId
      );
    },
    deleteMusicFailed: (
      state,
      action: PayloadAction<{ deleteError: string }>
    ) => {
      state.musicDataError = action.payload.deleteError;
      state.deletedMusicId = null;
      state.deleteIsPending = false;
    },
    resetDeleteMusicState: (state) => {
      state.deletedMusicId = null;
      state.musicDataError = null;
      state.deleteIsPending = false;
    },

    // Reset error
    resetMusicDataError: (state) => {
      state.musicDataError = null
    }
  },
});

export const {
  fetchMusicDataRequested,
  fetchMusicDataSucceeded,
  fetchMusicDataFailed,
  resetFetchDataState,
  setSearchQuery,
  setSortOption,

  createMusicRequested,
  createMusicSucceeded,
  createMusicFailed,
  resetCreateMusicState,

  updateMusicRequested,
  updateMusicSucceeded,
  updateMusicFailed,
  resetUpdateMusicState,

  deleteMusicRequested,
  deleteMusicSucceeded,
  deleteMusicFailed,
  resetDeleteMusicState,

  resetMusicDataError
} = musicDataSlice.actions;

export const selectSearchQuery = (state: { musicData: MusicDataState }) =>
  state.musicData.searchQuery;

export const selectSortOption = (state: { musicData: MusicDataState }) =>
  state.musicData.sortOption;

export default musicDataSlice.reducer;
