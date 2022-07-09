import { combineReducers } from 'redux';
import { cartReducer } from './cart/cart.reducer';
import { productsReducer } from './products/products.reducer';

// the key is the reducer slice and the value is the reducer function
export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});
