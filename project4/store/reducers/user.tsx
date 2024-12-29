import { User } from "../../models/user";
import { AuthAction, AUTHENTICATE, LOGOUT } from "../actions/user";

const initialState = null;

export const userReducer = (
  state: User | null = initialState,
  action: { type: string }
): User | null => {
  if (action.type === AUTHENTICATE) {
    return (action as AuthAction).user;
  }
  if (action.type === LOGOUT) {
    return initialState;
  }
  return state;
};
