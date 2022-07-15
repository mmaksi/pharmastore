import { createSelector } from "reselect";

const selectUsersReducer = (state) => state.users;

export const selectUser = createSelector(
  [selectUsersReducer],
  (usersReducerSlice) => {
    return usersReducerSlice.user;
  }
);

export const selectUserIsLoggedIn = createSelector(
  [selectUsersReducer],
  (usersReducerSlice) => {
    return usersReducerSlice.isLoggedIn;
  }
);
