import { CartItem } from "../../models/cart-item";
import {
  AddToCartAction,
  ADD_TO_CART,
  RemoveFromCartAction,
  REMOVE_FROM_CART,
} from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DeleteProductAction, DELETE_PRODUCT } from "../actions/products";

export interface CartState {
  [key: number]: CartItem;
}

const initialState = {};

export const cartReducer = (
  state: CartState = initialState,
  action: { type: string }
): CartState => {
  if (action.type === ADD_TO_CART) {
    const temp = action as AddToCartAction;
    return {
      ...state,
      [temp.product.id]: {
        product: temp.product,
        quantity: state[temp.product.id]
          ? state[temp.product.id].quantity + 1
          : 1,
      } as CartItem,
    };
  } else if (action.type === REMOVE_FROM_CART) {
    const temp = action as RemoveFromCartAction;
    if (state[temp.productId].quantity > 1) {
      return {
        ...state,
        [temp.productId]: {
          product: state[temp.productId].product,
          quantity: state[temp.productId].quantity - 1,
        } as CartItem,
      };
    }
    const updatedState = { ...state };
    delete updatedState[temp.productId];
    return updatedState;
  } else if (action.type === ADD_ORDER) {
    return initialState;
  } else if (action.type === DELETE_PRODUCT) {
    const temp = action as DeleteProductAction;
    if (!state[temp.id]) {
      return state;
    }
    const updatedState = { ...state };
    delete updatedState[temp.id];
    return updatedState;
  }
  return state;
};
