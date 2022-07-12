import { createSelector } from "reselect";

const selectOrdersReducer = (state) => state.orders;

export const selectOrders = createSelector(
  [selectOrdersReducer],
  (ordersReducerSlice) => {
    return ordersReducerSlice.orders;
  }
);

export const selectOrdersIsLoading = createSelector(
  [selectOrdersReducer],
  (ordersReducerSlice) => ordersReducerSlice.isLoading
);

export const selectOrdersIsLoadingError = createSelector(
  [selectOrdersReducer],
  (ordersReducerSlice) => ordersReducerSlice.error
);
