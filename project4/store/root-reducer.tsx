import { User } from "../models/user";
import { CartState } from "./reducers/cart";
import { OrdersState } from "./reducers/orders";
import { ProductsState } from "./reducers/products";

export interface RootReducer {
  user: User;
  products: ProductsState;
  cart: CartState;
  orders: OrdersState;
}
