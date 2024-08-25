import { createSlice } from "@reduxjs/toolkit";
import { Music } from "../../definitions/defn";

interface MusicDataState {
  musicData: Music[];
  sortOption: string;
  searchQuery: string;
  loading: boolean;
  loadError: string | null;
}

const initialState: MusicDataState = {
  musicData: [],
  sortOption: "a-z",
  searchQuery: '',
  loadError: null,
  loading: false,
};

export const musicDataSlice = createSlice({
  name: "musicData",
  initialState,
  reducers: {
    fetchMusicDataRequested: (state, action) => {
      state.searchQuery = action.payload.searchQuery;
      state.sortOption = action.payload.sortBy;
      state.loading = true;
    },
    fetchMusicDataSucceeded: (state, action) => {
      state.musicData = action.payload;
      state.sortOption = action.payload.sortBy;
      state.searchQuery = '';
      state.loading = false;
      state.loadError = null;
    },
    fetchMusicDataFailed: (state, action) => {
      state.loadError = action.payload;
      state.sortOption = 'a-z';
      state.searchQuery = '';
      state.loading = false;
      state.musicData = [];
    }
  },
});

export const {
  fetchMusicDataRequested,
  fetchMusicDataSucceeded,
  fetchMusicDataFailed
} = musicDataSlice.actions;

export default musicDataSlice.reducer;
