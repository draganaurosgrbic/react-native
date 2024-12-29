import { Product } from "../../models/product";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  product: Product;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  productId: number;
}

export const addToCart = (product: Product): AddToCartAction => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const removeFromCart = (productId: number): RemoveFromCartAction => {
  return {
    type: REMOVE_FROM_CART,
    productId,
  };
};
