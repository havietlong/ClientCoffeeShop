import { OrderItem } from "./OrderItem";

export class Order {
    id!: string;
    status!: string;
    createdAt!: Date;
    updatedAt!: Date;
    items!: OrderItem[];
  }