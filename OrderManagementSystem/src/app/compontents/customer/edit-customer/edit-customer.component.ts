import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  @Input() customer?: Customer;
  @Output() customersUpdated = new EventEmitter<Customer[]>();

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  updateCustomer(customer:Customer)
  {
    this.customerService
      .updateCustomer(customer)
      .subscribe((customers: Customer[]) => this.customersUpdated.emit(customers));
  }

  deleteCustomer(customer:Customer)
  {
    this.customerService
      .deleteCustomer(customer)
      .subscribe((customers: Customer[]) => this.customersUpdated.emit(customers));
  }

  createCustomer(customer:Customer)
  {
    this.customerService
      .createCustomer(customer)
      .subscribe((customers: Customer[]) => this.customersUpdated.emit(customers));
  }

}
