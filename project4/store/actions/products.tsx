import axios from "axios";
import { BASE_URL } from "../../constants/api";
import { Product } from "../../models/product";

const API_URL = `${BASE_URL}/api/products`;

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_MY_PRODUCTS = "SET_MY_PRODUCTS";
export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export interface SetProductsAction {
  type: typeof SET_PRODUCTS | typeof SET_MY_PRODUCTS;
  products: Product[];
}

export interface SaveProductAction {
  type: typeof SAVE_PRODUCT;
  product: Product;
}

export interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  id: number;
}

export const setProducts = () => {
  return async (
    dispatch: (action: SetProductsAction) => void
  ): Promise<void> => {
    dispatch({
      type: SET_PRODUCTS,
      products: (await axios.get(API_URL)).data as Product[],
    });
  };
};

export const setMyProducts = () => {
  return async (
    dispatch: (action: SetProductsAction) => void
  ): Promise<void> => {
    dispatch({
      type: SET_MY_PRODUCTS,
      products: (await axios.get(`${API_URL}/my`)).data as Product[],
    });
  };
};

export const saveProduct = (product: Product) => {
  return async (
    dispatch: (action: SaveProductAction) => void
  ): Promise<void> => {
    dispatch({
      type: SAVE_PRODUCT,
      product: (
        await (!product.id
          ? axios.post(API_URL, product)
          : axios.put(`${API_URL}/${product.id}`, product))
      ).data as Product,
    });
  };
};

export const deleteProduct = (id: number) => {
  return async (
    dispatch: (action: DeleteProductAction) => void
  ): Promise<void> => {
    if (!(await axios.delete(`${API_URL}/${id}`)).status) {
      throw new Error("Something is wrong!");
    }
    dispatch({
      type: DELETE_PRODUCT,
      id,
    });
  };
};
