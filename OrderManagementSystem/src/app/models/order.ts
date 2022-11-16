import { OrderItem } from "./orderItem";

export class Order {
    id?: number;
    orderNr?: number;
    totalAmount?: number;
    date?: Date;
    customerId?: number;
    organizationId?: number;
    items?: OrderItem[]; 

}