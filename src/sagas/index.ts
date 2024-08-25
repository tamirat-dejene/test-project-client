import { all } from "redux-saga/effects";
import { watchCreateMusic } from "./create-music-saga";
import { watchDeleteMusic } from "./delete-music-saga";
import { watchFetchMusicData } from "./music-data-saga";
import { watchUpdateMusic } from "./update-music-saga";

export default function* rootSaga() {
  yield all([
    watchFetchMusicData(),
    watchCreateMusic(),
    watchUpdateMusic(),
    watchDeleteMusic(),
  ]);
}