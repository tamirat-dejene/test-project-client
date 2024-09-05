import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, User } from "../definitions/defn";

interface UserDataState {
  user: User | null;
  accessToken: string | null;

  loginIsPending: boolean;
  registerIsPending: boolean;
  logoutIsPending: boolean;
  refreshSessionIsPending: boolean;

  userDataError: string | null;
}

const initialState: UserDataState = {
  user: null,
  accessToken: null,

  loginIsPending: false,
  registerIsPending: false,
  logoutIsPending: false,
  refreshSessionIsPending: true,

  userDataError: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    refreshSessionRequested(state) {
      state.refreshSessionIsPending = true;
    },

    refreshSessionSucceeded(state, action: PayloadAction<AuthResponse>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshSessionIsPending = false;
    },

    refreshSessionFailed(state, action: PayloadAction<{ error: string }>) {
      state.userDataError = action.payload.error;
      state.refreshSessionIsPending = false;
    },

    loginUserRequested(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.loginIsPending = true;
    },

    loginUserSucceeded(state, action: PayloadAction<AuthResponse>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.loginIsPending = false;
    },

    loginUserFailed(state, action: PayloadAction<{ error: string }>) {
      state.user = null;
      state.userDataError = action.payload.error;
      state.loginIsPending = false;
    },

    registerUserRequested(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.registerIsPending = true;
    },

    registerUserSucceeded(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.registerIsPending = false;
    },

    registerUserFailed(state, action: PayloadAction<{ error: string }>) {
      state.user = null;
      state.userDataError = action.payload.error;
      state.registerIsPending = false;
    },

    logoutUserRequested(state) {
      state.logoutIsPending = true;
    },

    logoutUserSucceeded(state) {
      state.user = null;
      state.accessToken = null;
      state.logoutIsPending = false;
    },

    logoutUserFailed(state, action: PayloadAction<{ error: string }>) {
      state.userDataError = action.payload.error;
      state.logoutIsPending = false;
    },

    resetUserDataError(state) {
      state.userDataError = null;
    }
  },
});

export const {
  refreshSessionRequested,
  refreshSessionSucceeded,
  refreshSessionFailed,
  loginUserRequested,
  loginUserSucceeded,
  loginUserFailed,
  registerUserRequested,
  registerUserSucceeded,
  registerUserFailed,
  logoutUserRequested,
  logoutUserSucceeded,
  logoutUserFailed,
  resetUserDataError,
} = userDataSlice.actions;

export const selectAuthToken = (state: { userData: UserDataState }) =>
  state.userData.accessToken;
export default userDataSlice.reducer;
