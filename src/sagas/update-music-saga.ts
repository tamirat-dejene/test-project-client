import { put, call, takeLatest } from "redux-saga/effects";
import { Music } from "../definitions/defn";
import {
  deleteMusicRequested,
  deleteMusicSucceeded,
  deleteMusicFailed,
} from "../features/deletemusic/delete-music-slice";

import { updateMusic } from "../services/api";

function* updateMusicSaga(action: { type: string; payload: { id: number; music: Music } }) {
  try {
    yield call(updateMusic, action.payload.id, action.payload.music);
    yield put(deleteMusicSucceeded());
  } catch (error) {
    yield put(deleteMusicFailed(error));
  }
}

export function* watchUpdateMusic() {
  yield takeLatest(deleteMusicRequested.type, updateMusicSaga);
}