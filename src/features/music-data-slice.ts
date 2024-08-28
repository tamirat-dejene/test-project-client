import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Music } from "../definitions/defn";

interface MusicDataState {
  // Music data
  musicData: Music[];
  sortOption: string;
  searchQuery: string;
  loading: boolean;
  loadError: string | null;

  // Create music
  createdMusic: Music | null;
  createError: string | null;
  createIsPending: boolean;

  // Update music
  updatedMusic: Music | null;
  updateError: string | null;
  updateIsPending: boolean;

  // Delete music
  deletedMusicId: number | null;
  deleteError: string | null;
  deleteIsPending: boolean;

  formErrors: {
    titleError?: string | null;
    albumError?: string | null;
    artistError?: string | null;
    genreError?: string | null;
    durationError?: string | null;
    urlError?: string | null;
  };
}

const initialState: MusicDataState = {
  musicData: [],
  sortOption: "",
  searchQuery: "",
  loading: true,
  loadError: null,

  createdMusic: null,
  createError: null,
  createIsPending: false,

  updatedMusic: null,
  updateError: null,
  updateIsPending: false,

  deletedMusicId: null,
  deleteError: null,
  deleteIsPending: false,

  formErrors: {
    titleError: null,
    albumError: null,
    artistError: null,
    genreError: null,
    durationError: null,
    urlError: null,
  },
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
    fetchMusicDataFailed: (state, action: PayloadAction<{ fetchError: string }>) => {
      state.loadError = action.payload.fetchError;
      state.loading = false;
    },
    resetFetchDataState: (state) => {
      state.loadError = null;
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
    createMusicFailed: (state, action: PayloadAction<{ createError: string }>) => {
      state.createError = action.payload.createError;
      state.createIsPending = false;
    },
    resetCreateMusicState: (state) => {
      state.createdMusic = null;
      state.createError = null;
      state.createIsPending = false;
    },

    // Update music
    updateMusicRequested: (
      state,
      action: PayloadAction<{ updatedMusic: Music }>
    ) => {
      state.updatedMusic = action.payload.updatedMusic;
      state.updateIsPending = true;
      state.updateError = null;
    },
    updateMusicSucceeded: (
      state,
      action: PayloadAction<{ updatedMusic: Music }>
    ) => {
      state.musicData = state.musicData.map((music) =>
        music.id === action.payload.updatedMusic.id ? action.payload.updatedMusic : music
      );
      state.updateIsPending = false;
    },
    updateMusicFailed: (state, action: PayloadAction<{ updateError: string }>) => {
      state.updateError = action.payload.updateError;
      state.updateIsPending = false;
    },
    resetUpdateMusicState: (state) => {
      state.updatedMusic = null;
      state.updateError = null;
      state.updateIsPending = false;
    },

    // Delete music
    deleteMusicRequested: (state, _action: PayloadAction<{ deletedMusicId: number}>) => {
      state.deletedMusicId = _action.payload.deletedMusicId;
      state.deleteIsPending = true;
    },
    deleteMusicSucceeded: (state) => {
      state.deleteIsPending = false;
      state.musicData = state.musicData.filter(
        (music) => music.id !== state.deletedMusicId
      );
    },
    deleteMusicFailed: (state, action: PayloadAction<{ deleteError: string }>) => {
      state.deleteError = action.payload.deleteError;
      state.deletedMusicId = null;
      state.deleteIsPending = false;
    },
    resetDeleteMusicState: (state) => {
      state.deletedMusicId = null;
      state.deleteError = null;
      state.deleteIsPending = false;
    },

    setFormErrors: (
      state,
      action: PayloadAction<{
        titleError?: string | null;
        albumError?: string | null;
        artistError?: string | null;
        genreError?: string | null;
        durationError?: string | null;
        urlError?: string | null;
      }>
    ) => {
      state.formErrors = action.payload;
    },

    resetFormErrors: (state) => {
      state.formErrors = {
        titleError: null,
        albumError: null,
        artistError: null,
        genreError: null,
        durationError: null,
        urlError: null,
      };
    },
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

  setFormErrors,
  resetFormErrors,
} = musicDataSlice.actions;

export const selectSearchQuery = (state: { musicData: MusicDataState }) =>
  state.musicData.searchQuery;

export const selectSortOption = (state: { musicData: MusicDataState }) =>
  state.musicData.sortOption;

export default musicDataSlice.reducer;
