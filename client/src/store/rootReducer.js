import { combineReducers } from 'redux';
import { cartReducer } from './cart/cart.reducer';
import { ordersReducer } from './orders/orders.reducer';
import { productsReducer } from './products/products.reducer';
import { usersReducer } from './users/users.reducer';

// the key is the reducer slice and the value is the reducer function
export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  users: usersReducer,
  orders: ordersReducer
});
