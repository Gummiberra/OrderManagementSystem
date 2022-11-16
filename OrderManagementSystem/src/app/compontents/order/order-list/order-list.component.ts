import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];
  orderToEdit?: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((result: Order[]) => (this.orders = result));
  }

  updateOrderList(orders: Order[])
  {
    this.orders = orders;
  }

  initNewOrder()
  {
    this.orderToEdit = new Order();
  }

  editOrder(order: Order)
  {
    this.orderToEdit = order;
  }

}



