import USERS_ACTION_TYPES from "./users.types";

export const USERS_INITIAL_STATE = {
  isAdmin: false,
  user: {},
  isLoggedIn: false,
};

export const usersReducer = (state = USERS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USERS_ACTION_TYPES.SIGN_UP_USER:
      return { ...state, isLoggedIn: true, user: payload };

    case USERS_ACTION_TYPES.SIGN_IN_USER:
      return { ...state, isLoggedIn: true, user: payload };

    case USERS_ACTION_TYPES.SET_LOG_IN:
      return { ...state, isLoggedIn: payload };

    case USERS_ACTION_TYPES.SET_ADMIN:
      return { ...state, isAdmin: payload };

    case USERS_ACTION_TYPES.CLEAR_USER:
      return { ...state, isLoggedIn: false, isAdmin: false, user: payload };
      
    default:
      return state;
  }
};
