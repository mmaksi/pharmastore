import axios from "axios";
import ORDERS_ACTION_TYPES from "./orders.types";
import createAction from "../../utils/reducer.utils";
import API_URL from "../../utils/API_URL";

const fetchOrdersStartAsync = () => async (dispatch) => {
  // dispatch startAction
  dispatch(fetchOrdersStart());
  try {
    // dispatch success action
    const { data: orders } = await axios.get(`${API_URL}/orders`);
    dispatch(fetchOrdersSuccess(orders));
  } catch (error) {
    // dispatch failure action
    dispatch(fetchOrdersFailure(error.message));
  }
};

/* orders loading start action handler */
const fetchOrdersStart = () =>
  createAction(ORDERS_ACTION_TYPES.FETCH_ORDERS_START);

/* orders loading success action handler */
const fetchOrdersSuccess = (orders) =>
  createAction(ORDERS_ACTION_TYPES.FETCH_ORDERS_SUCCESS, orders);

/* orders loading failure action handler */
const fetchOrdersFailure = (error) => {
  createAction(ORDERS_ACTION_TYPES.FETCH_ORDERS_FAILED, error);
};

export default fetchOrdersStartAsync;
