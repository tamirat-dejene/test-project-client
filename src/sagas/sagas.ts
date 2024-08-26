import { put, call, takeLatest, all, select } from "redux-saga/effects";

import {
  fetchMusicDataFailed,
  fetchMusicDataSucceeded,
  fetchMusicDataRequested,
  createMusicSucceeded,
  createMusicFailed,
  createMusicRequested,
  updateMusicSucceeded,
  updateMusicFailed,
  updateMusicRequested,
  deleteMusicRequested,
  deleteMusicSucceeded,
  deleteMusicFailed,
  selectSearchQuery,
  selectSortOption,
} from "../features/music-data-slice";

import {
  createMusic,
  updateMusic,
  deleteMusic,
  fetchMusics,
} from "../services/api";
import { Music } from "../definitions/defn";

// Sagas

// Create music
function* createMusicSaga(action: {
  type: string;
  payload: { newMusic: Music };
}) {
  try {
    const newMusic: Music = yield call(createMusic, action.payload.newMusic);
    yield put(createMusicSucceeded({ newMusic }));
  } catch (error) {
    switch ((error as Error).message) {
      case "Failed to fetch":
        yield put(
          createMusicFailed({
            createError: "Failed to connect to the server",
          })
        );
        break;
      default:
        yield put(createMusicFailed({ createError: (error as Error).message }));
    }
  }
}

// Delete music
function* deleteMusicSaga(action: {
  type: string;
  payload: { deletedMusicId: number };
}) {
  try {
    console.log("Deleting music with id: ", action.payload.deletedMusicId);
    const q: boolean = yield call(deleteMusic, action.payload.deletedMusicId);

    if(!q) throw(new Error('Unable to connect to the server'))
    yield put(deleteMusicSucceeded());
  } catch (error) {
    yield put(deleteMusicFailed({ deleteError: (error as Error).message }));
  }
}

// Fetch music data: later I will come back to this function
function* fetchMusicDataSaga() {
  const searchQuery = selectSearchQuery(yield select());
  const sortOption = selectSortOption(yield select());

  try {
    const musicData: Music[] = yield call(() =>
      fetchMusics({ searchQuery, sortOption })
    );
    yield put(fetchMusicDataSucceeded({ musicList: musicData }));
  } catch (error) {
    yield put(fetchMusicDataFailed({ fetchError: (error as Error).message }));
  }
}

function* updateMusicSaga(action: {
  type: string;
  payload: { updatedMusic: Music };
}) {
  try {
    const updatedMusic: Music = yield call(
      updateMusic,
      action.payload.updatedMusic.id as number,
      action.payload.updatedMusic
    );
    yield put(updateMusicSucceeded({ updatedMusic }));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    yield put(
      updateMusicFailed({ updateError: "Failed to connect to the server" })
    );
  }
}

// Watchers
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
