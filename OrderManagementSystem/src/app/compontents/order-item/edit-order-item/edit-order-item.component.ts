import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderItem } from 'src/app/models/orderItem';
import { OrderItemService } from 'src/app/services/order-item.service';

@Component({
  selector: 'app-edit-order-item',
  templateUrl: './edit-order-item.component.html',
  styleUrls: ['./edit-order-item.component.css']
})
export class EditOrderItemComponent implements OnInit {
  @Input() orderItem?: OrderItem;
  @Output() orderItemsUpdated = new EventEmitter<OrderItem[]>();

  constructor(private orderItemService: OrderItemService) { }

  ngOnInit(): void {
  }

  updateOrderItem(orderItem:OrderItem)
  {
    this.orderItemService
      .updateOrderItem(orderItem)
      .subscribe((orderItems: OrderItem[]) => this.orderItemsUpdated.emit(orderItems));
  }

  deleteOrderItem(orderItem:OrderItem)
  {
    this.orderItemService
      .deleteOrderItem(orderItem)
      .subscribe((orderItems: OrderItem[]) => this.orderItemsUpdated.emit(orderItems));
  }

  createOrderItem(orderItem:OrderItem)
  {
    this.orderItemService
      .createOrderItem(orderItem)
      .subscribe((orderItems: OrderItem[]) => this.orderItemsUpdated.emit(orderItems));
  }
}

