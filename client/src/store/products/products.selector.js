import { createSelector } from "reselect";

const selectProductsReducer = (state) => state.products;

export const selectProducts = createSelector(
  [selectProductsReducer],
  (productsReducer) => {
    return productsReducer.products;
  }
);

export const selectProductsIsLoading = createSelector(
  [selectProductsReducer],
  (productsReducer) => productsReducer.isLoading
)

export const selectProductsIsLoadingError = createSelector(
  [selectProductsReducer],
  (productsReducer) => productsReducer.error
)
