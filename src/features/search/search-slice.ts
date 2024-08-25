import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface SearchState {
  searchQuery: string;
}
const initialState: SearchState = {
  searchQuery: '',
};

export const searchSlice = createSlice({
  name: 'searched',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export const selectSearchQuery = (state: { searched: SearchState }) => state.searched.searchQuery;
export default searchSlice.reducer;
