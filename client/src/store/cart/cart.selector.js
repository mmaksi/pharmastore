import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

// export const selectCartIsOpen = createSelector(
//   [selectCartReducer],
//   (cartReducerSlice) => cartReducerSlice.isCartOpen
// );

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartReducerSlice) => cartReducerSlice.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);
