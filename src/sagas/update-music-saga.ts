import { put, call, takeLatest } from "redux-saga/effects";
import { Music } from "../definitions/defn";
import {
  updateMusicRequested,
  updateMusicSucceeded,
  updateMusicFailed,
} from '../features/updateMusic/update-music-slice';

import { updateMusic } from "../services/api";

function* updateMusicSaga(action: { type: string; payload: Music }) {
  try {
    const updatedMusic: Music = yield call(updateMusic, action.payload.id as number, action.payload);
    yield put(updateMusicSucceeded(updatedMusic));
  } catch (error) {
    yield put(updateMusicFailed({ error: (error as Error).message }));
  }
}

export function* watchUpdateMusic() {
  yield takeLatest(updateMusicRequested.type, updateMusicSaga);
}