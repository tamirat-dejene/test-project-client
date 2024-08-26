import { put, call, takeLatest, all, select } from "redux-saga/effects";

import {
  createMusicRequested,
  createMusicSucceeded,
  createMusicFailed,
} from "../features/createmusic/create-music-slice";

import {
  deleteMusicRequested,
  deleteMusicSucceeded,
  deleteMusicFailed,
} from "../features/deletemusic/delete-music-slice";

import {
  fetchMusicDataFailed,
  fetchMusicDataSucceeded,
  fetchMusicDataRequested,
} from "../features/fetchmusic/music-data-slice";

import {
  updateMusicRequested,
  updateMusicSucceeded,
  updateMusicFailed,
} from "../features/updateMusic/update-music-slice";

import {
  createMusic,
  updateMusic,
  deleteMusic,
  fetchMusics,
} from "../services/api";
import { Music } from "../definitions/defn";
import { RootState } from "../app/store";

function* createMusicSaga(action: { type: string; payload: Music }) {
  try {
    const newMusic: Music = yield call(createMusic, action.payload);
    yield put(createMusicSucceeded(newMusic));
    const { searchQuery, sortOption } = yield select((state: RootState) => state.musicData);
    yield put(fetchMusicDataRequested({ searchQuery, sortOption }));
  } catch (error) {
    yield put(createMusicFailed({ error: (error as Error).message }));
  }
}

function* deleteMusicSaga(action: { type: string; payload: number }) {
  try {
    yield call(deleteMusic, action.payload);
    yield put(deleteMusicSucceeded());

    


  } catch (error) {
    yield put(deleteMusicFailed({ error: (error as Error).message }));
  }
}

function* fetchMusicDataSaga(action: {
  type: string;
  payload: { searchQuery: string; sortOption: string };
}) {
  const { searchQuery, sortOption } = action.payload;

  try {
    const musicData: Music[] = yield call(() =>
      fetchMusics({ searchQuery, sortBy: sortOption })
    );
    yield put(fetchMusicDataSucceeded(musicData));
  } catch (error) {
    yield put(fetchMusicDataFailed({ error: (error as Error).message }));
  }
}

function* updateMusicSaga(action: { type: string; payload: Music }) {
  try {
    const updatedMusic: Music = yield call(
      updateMusic,
      action.payload.id as number,
      action.payload
    );
    yield put(updateMusicSucceeded(updatedMusic));
    const { searchQuery, sortOption } = yield select(
      (state: RootState) => state.musicData
    );
    yield put(fetchMusicDataRequested({ searchQuery, sortOption }));
  } catch (error) {
    yield put(updateMusicFailed({ error: (error as Error).message }));
  }
}

export function* watchUpdateMusic() {
  yield takeLatest(updateMusicRequested.type, updateMusicSaga);
}
export function* watchFetchMusicData() {
  yield takeLatest(fetchMusicDataRequested.type, fetchMusicDataSaga);
}
export function* watchDeleteMusic() {
  yield takeLatest(deleteMusicRequested.type, deleteMusicSaga);
}
export function* watchCreateMusic() {
  yield takeLatest(createMusicRequested.type, createMusicSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchMusicData(),
    watchCreateMusic(),
    watchUpdateMusic(),
    watchDeleteMusic(),
  ]);
}
