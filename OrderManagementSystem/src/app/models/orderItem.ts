import { Product } from "./product";

export class OrderItem{
    id?: number;
    quantity?: number;
    amount?: number;
    product?: Product;
    customerId?: number;
}