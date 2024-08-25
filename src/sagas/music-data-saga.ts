import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchMusicDataFailed,
  fetchMusicDataSucceeded,
  fetchMusicDataRequested,
} from "../features/fetchmusic/music-data-slice";
import { Music } from "../definitions/defn";
import { fetchMusics } from "../services/api";

function* fetchMusicDataSaga(action: {
  type: string;
  payload: { searchQuery: string; sortOption: string };
}) {
  const { searchQuery, sortOption } = action.payload;

  try {
    const musicData: Music[] = yield call(() => fetchMusics({ searchQuery, sortBy: sortOption }));
    yield put(fetchMusicDataSucceeded(musicData));
  } catch (error) {
    yield put(fetchMusicDataFailed({ error: (error as Error).message }));
  }
}

export function* watchFetchMusicData() {
  yield takeLatest(fetchMusicDataRequested.type, fetchMusicDataSaga);
}
