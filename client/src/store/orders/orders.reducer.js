import ORDERS_ACTION_TYPES from "./orders.types";

export const ORDERS_INITIAL_STATE = {
  orders: [],
  isLoading: false,
  error: null,
};

export const ordersReducer = (
  state = ORDERS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case ORDERS_ACTION_TYPES.FETCH_ORDERS_START:
      return { ...state, isLoading: true };
    case ORDERS_ACTION_TYPES.FETCH_ORDERS_SUCCESS:
      return { ...state, isLoading: false, orders: payload };
    case ORDERS_ACTION_TYPES.FETCH_ORDERS_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
