import axios from "axios";
import { BASE_URL } from "../../constants/api";
import { User } from "../../models/user";
import { getExpoPushTokenAsync } from "expo-notifications";
import {
  loadUserFromStorage,
  removeUserFromStorage,
  saveUserInStorage,
} from "../storage";

const API_URL = `${BASE_URL}/auth`;

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export interface AuthAction {
  type: typeof AUTHENTICATE;
  user: User;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export const login = (user?: User) => {
  return async (dispatch: (action: AuthAction) => void): Promise<void> => {
    user = user
      ? ((await axios.post(`${API_URL}/login`, user)).data as User)
      : ((await loadUserFromStorage()) as User);
    await saveUserInStorage(user);
    dispatch({
      type: AUTHENTICATE,
      user,
    });
  };
};

export const register = (user: User) => {
  return async (dispatch: (action: AuthAction) => void): Promise<void> => {
    user.pushToken = (await getExpoPushTokenAsync()).data;
    user = (await axios.post(`${API_URL}/register`, user)).data as User;
    await saveUserInStorage(user);
    dispatch({
      type: AUTHENTICATE,
      user,
    });
  };
};

export const logout = () => {
  return async (dispatch: (action: LogoutAction) => void): Promise<void> => {
    await removeUserFromStorage();
    dispatch({
      type: LOGOUT,
    });
  };
};
