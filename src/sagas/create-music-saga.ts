import { put, call, takeLatest } from "redux-saga/effects";
import { Music } from "../definitions/defn";
import {
  createMusicRequested,
  createMusicSucceeded,
  createMusicFailed,
} from "../features/createmusic/create-music-slice";
import { createMusic } from "../services/api";


function* createMusicSaga(action: { type: string; payload: Music }) {
  try {
    const newMusic: Music = yield call(createMusic, action.payload);
    yield put(createMusicSucceeded(newMusic));
  } catch (error) {
    yield put(createMusicFailed(error));
  }
}

export function* watchCreateMusic() {
  yield takeLatest(createMusicRequested.type, createMusicSaga);
}