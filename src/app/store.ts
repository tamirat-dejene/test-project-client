import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { searchSlice } from '../features/search/search-slice';
import { sortBySlice } from '../features/sort-by/sortby-slice';
import { musicDataSlice } from '../features/fetchmusic/music-data-slice';
import { createMusicSlice } from '../features/createmusic/create-music-slice';
import { deleteMusicSlice } from '../features/deletemusic/delete-music-slice';
import { updateMusicSlice } from '../features/updateMusic/update-music-slice';
import rootSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    sortBy: sortBySlice.reducer,
    musicData: musicDataSlice.reducer,
    createMusic: createMusicSlice.reducer,
    deleteMusic: deleteMusicSlice.reducer,
    updateMusic: updateMusicSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;