import { Order } from "../../models/order";
import { SetOrdersAction, SET_ORDERS } from "../actions/orders";

export interface OrdersState {
  orders: Order[];
}

const initialState = {
  orders: [],
};

export const ordersReducer = (
  state: OrdersState = initialState,
  action: { type: string }
): OrdersState => {
  if (action.type === SET_ORDERS) {
    return {
      ...state,
      orders: (action as SetOrdersAction).orders,
    };
  }
  return state;
};
