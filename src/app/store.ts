import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import rootSaga from "../sagas/sagas";
import { musicDataSlice } from "../features/music-data-slice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    musicData: musicDataSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
