import { CartItem } from "./cart-item";
import { User } from "./user";

export interface Order {
  id: number;
  date: Date;
  items: CartItem[];
  owner: User;
}
