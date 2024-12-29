import { User } from "./user";

export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  owner: User;
}
