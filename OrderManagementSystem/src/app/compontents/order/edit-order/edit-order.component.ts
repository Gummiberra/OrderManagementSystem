import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  @Input() order?: Order;
  @Output() ordersUpdated = new EventEmitter<Order[]>();
  customers: Customer[] = [];
  

  constructor(private orderService: OrderService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((result: Customer[]) => (this.customers = result));
  }

  updateOrder(order:Order)
  {
    this.orderService
      .updateOrder(order)
      .subscribe((orders: Order[]) => this.ordersUpdated.emit(orders));
  }

  deleteOrder(order:Order)
  {
    this.orderService
      .deleteOrder(order)
      .subscribe((orders: Order[]) => this.ordersUpdated.emit(orders));
  }

  createOrder(order:Order)
  {
    this.orderService
      .createOrder(order)
      .subscribe((orders: Order[]) => this.ordersUpdated.emit(orders));
  }
}

