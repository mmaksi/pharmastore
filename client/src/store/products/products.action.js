import axios from "axios";
import PRODUCTS_ACTION_TYPES from "./products.types";
import createAction from "../../utils/reducer.utils";
import API_URL from "../../utils/API_URL";

export const fetchCategoryProductsStartAsync = (categoryName) => async (dispatch) => {
  // dispatch startAction
  dispatch(fetchProductsStart());
  try {
    // dispatch success action
    const response = await axios.get(`${API_URL}/products/${categoryName}`);
    const products = await response.data;
    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    // dispatch failure action
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductsStartAsync = () => async (dispatch) => {
  // dispatch startAction
  dispatch(fetchProductsStart());
  try {
    // dispatch success action
    const response = await axios.get(`${API_URL}/products`);
    const products = await response.data;
    dispatch(fetchProductsSuccess(products));
  } catch (error) {
    // dispatch failure action
    dispatch(fetchProductsFailure(error.message));
  }
};

/* products loading start action handler */
const fetchProductsStart = () =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START);

/* products loading success action handler */
const fetchProductsSuccess = (products) =>
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS, products);

/* products loading failure action handler */
const fetchProductsFailure = (error) => {
  createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED, error);
};