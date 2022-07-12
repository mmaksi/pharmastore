import USERS_ACTION_TYPES from "./users.types";

export const USERS_INITIAL_STATE = {
  user: {}
};

export const usersReducer = (
  state = USERS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case USERS_ACTION_TYPES.SIGN_UP_USER:
      return { ...state, user: payload };
    case USERS_ACTION_TYPES.SIGN_IN_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};
