import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/user";

const STORAGE_KEY = "AUTH_USER";

export const saveUserInStorage = (user: User): Promise<void> => {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const loadUserFromStorage = async (): Promise<User | null> => {
  try {
    return JSON.parse((await AsyncStorage.getItem(STORAGE_KEY)) as string);
  } catch {
    return null;
  }
};

export const removeUserFromStorage = (): Promise<void> => {
  return AsyncStorage.removeItem(STORAGE_KEY);
};
