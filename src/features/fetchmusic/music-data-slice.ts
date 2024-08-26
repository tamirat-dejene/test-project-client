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
      state.sortOption = 'a-z';
      state.searchQuery = '';
      state.loading = false;
    },
    fetchMusicDataFailed: (state, action) => {
      state.loadError = action.payload;
      state.sortOption = 'a-z';
      state.searchQuery = '';
      state.loading = false;
    },

    removeMusicWithId: (state, action) => {
      console.log('ac-pl',action.payload);
      state.musicData = state.musicData.filter(
        (music) => music.id !== action.payload
      );
    },

    updateMusicWithId: (state, action) => {
      const index = state.musicData.findIndex(
        (music) => music.id === action.payload.id
      );
      if (index !== -1) {
        state.musicData[index] = {
          ...state.musicData[index],
          ...action.payload,
        };
      }
    },

    createNewMusic: (state, action) => {
      state.musicData = [...state.musicData, action.payload];
    }
  },
});

export const {
  fetchMusicDataRequested,
  fetchMusicDataSucceeded,
  fetchMusicDataFailed,
  removeMusicWithId,
  updateMusicWithId,
  createNewMusic,
} = musicDataSlice.actions;

export default musicDataSlice.reducer;
