import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortByState {
  sortOption: string;
}

const initialState: SortByState = {
  sortOption: 'a-z',
};

export const sortBySlice = createSlice({
  name: 'sortBy',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
  },
});


export const { setSortBy } = sortBySlice.actions;
export const selectSortBy = (state: { sortedBy: SortByState }) => state.sortedBy.sortOption;
export default sortBySlice.reducer;