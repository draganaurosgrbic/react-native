import { Product } from "../../models/product";
import {
  SetProductsAction,
  SET_MY_PRODUCTS,
  SET_PRODUCTS,
} from "../actions/products";

export interface ProductsState {
  products: Product[];
  myProducts: Product[];
}

const initialState = {
  products: [],
  myProducts: [],
};

export const productsReducer = (
  state: ProductsState = initialState,
  action: { type: string }
): ProductsState => {
  if (action.type === SET_PRODUCTS) {
    return {
      ...state,
      products: (action as SetProductsAction).products,
    };
  } else if (action.type === SET_MY_PRODUCTS) {
    return {
      ...state,
      myProducts: (action as SetProductsAction).products,
    };
  }
  return state;
};
