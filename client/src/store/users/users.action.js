import USERS_ACTION_TYPES from "./users.types";
import createAction from "../../utils/reducer.utils";

export const signUpUser = (user) => {
  return createAction(USERS_ACTION_TYPES.SIGN_UP_USER, user)
}

export const signInUser = (user) => {
  return createAction(USERS_ACTION_TYPES.SIGN_IN_USER, user)
}

export const setUserIsLoggedIn = (boolean) => {
  return createAction(USERS_ACTION_TYPES.SET_LOG_IN, boolean)
}

export const clearUser = () => {
  return createAction(USERS_ACTION_TYPES.CLEAR_USER, {})
}