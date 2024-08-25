import { put, call, takeLatest } from "redux-saga/effects";
import {
  deleteMusicRequested,
  deleteMusicSucceeded,
  deleteMusicFailed,
} from "../features/deletemusic/delete-music-slice";

import { deleteMusic } from "../services/api";

function* deleteMusicSaga(action: { type: string; payload: number }) {
  try {
    yield call(deleteMusic, action.payload);
    yield put(deleteMusicSucceeded());
  } catch (error) {
    yield put(deleteMusicFailed({ error: (error as Error).message }));
  }
}

export function* watchDeleteMusic() {
  yield takeLatest(deleteMusicRequested.type, deleteMusicSaga);
}
