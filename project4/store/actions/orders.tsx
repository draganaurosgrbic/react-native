import axios from "axios";
import { BASE_URL } from "../../constants/api";
import { Order } from "../../models/order";

const API_URL = `${BASE_URL}/api/orders`;

export const SET_ORDERS = "SET_ORDERS";
export const ADD_ORDER = "ADD_ORDER";

export interface SetOrdersAction {
  type: typeof SET_ORDERS;
  orders: Order[];
}

export interface AddOrderAction {
  type: typeof ADD_ORDER;
  order: Order;
}

export const setOrders = () => {
  return async (dispatch: (action: SetOrdersAction) => void): Promise<void> => {
    dispatch({
      type: SET_ORDERS,
      orders: (await axios.get(API_URL)).data as Order[],
    });
  };
};

export const addOrder = (order: Order) => {
  return async (dispatch: (action: AddOrderAction) => void): Promise<void> => {
    dispatch({
      type: ADD_ORDER,
      order: (await axios.post(API_URL, order)).data as Order,
    });
  };
};
