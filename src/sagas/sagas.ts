import { put, call, takeLatest, all, select } from "redux-saga/effects";
import {
  loginUserFailed,
  loginUserRequested,
  loginUserSucceeded,
  registerUserFailed,
  registerUserRequested,
  registerUserSucceeded,
  logoutUserFailed,
  logoutUserRequested,
  logoutUserSucceeded,
  selectAuthToken,
  refreshSessionSucceeded,
  refreshSessionFailed,
  refreshSessionRequested,
} from "../features/user-data-slice";
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
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
} from "../services/api";
import { Music, User } from "../definitions/defn";

// Sagas

// Refresh session
function* refreshSessionSaga() {
  try {
    const {user, accessToken} = yield call(refreshSession);
    yield put(refreshSessionSucceeded({ user, accessToken }));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    yield put(refreshSessionFailed({ error: 'Login to continue' }));
  }
}

// Register user
function* createUserSaga(action: { type: string; payload: { user: User } }) {
  try {
    const user: User = yield call(registerUser, action.payload.user);
    yield put(registerUserSucceeded({ user }));
  } catch (error) {
    yield put(registerUserFailed({ error: (error as Error).message }));
  }
}

// Login user
function* loginUserSaga(action: { type: string; payload: { user: User } }) {
  try {
    const { accessToken, user } = yield call(loginUser, action.payload.user);
    yield put(loginUserSucceeded({ accessToken, user }));
  } catch (error) {
    yield put(loginUserFailed({ error: (error as Error).message }));
  }
}

// Logout user
function* logoutUserSaga() {
  try {
    const isLoggedOut: boolean = yield call(logoutUser);
    if (!isLoggedOut) throw Error("Unable to logout");
    yield put(logoutUserSucceeded());
  } catch (error) {
    yield put(logoutUserFailed({ error: (error as Error).message }));
  }
}

// Create music
function* createMusicSaga(action: {
  type: string;
  payload: { newMusic: Music };
}) {
  const authToken = selectAuthToken(yield select());
  try {
    const newMusic: Music = yield call(createMusic, action.payload.newMusic, authToken);
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
  const authToken = selectAuthToken(yield select());
  try {
    console.log("Deleting music with id: ", action.payload.deletedMusicId);
    const q: boolean = yield call(deleteMusic, action.payload.deletedMusicId, authToken);

    if (!q) throw new Error("Unable to connect to the server");
    yield put(deleteMusicSucceeded());
  } catch (error) {
    yield put(deleteMusicFailed({ deleteError: (error as Error).message }));
  }
}

// Fetch music data: later I will come back to this function
function* fetchMusicDataSaga() {
  const authToken = selectAuthToken(yield select());
  const searchQuery = selectSearchQuery(yield select());
  const sortOption = selectSortOption(yield select());

  try {
    const musicData: Music[] = yield call(() =>
      fetchMusics({ authToken, searchQuery, sortOption })
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
  const authToken = selectAuthToken(yield select());
  try {
    const updatedMusic: Music = yield call(
      updateMusic,
      action.payload.updatedMusic.id as number,
      action.payload.updatedMusic,
      authToken
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
export function* watchRefreshSession() {
  yield takeLatest(refreshSessionRequested.type, refreshSessionSaga);
}

export function* watchRegisterUser() {
  yield takeLatest(registerUserRequested.type, createUserSaga);
}
export function* watchLoginUser() {
  yield takeLatest(loginUserRequested.type, loginUserSaga);
}
export function* watchLogoutUser() {
  yield takeLatest(logoutUserRequested.type, logoutUserSaga);
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
    watchLoginUser(),
    watchLogoutUser(),
    watchRegisterUser(),
    watchRefreshSession(),

    watchCreateMusic(),
    watchUpdateMusic(),
    watchDeleteMusic(),
    watchFetchMusicData(),
  ]);
}
