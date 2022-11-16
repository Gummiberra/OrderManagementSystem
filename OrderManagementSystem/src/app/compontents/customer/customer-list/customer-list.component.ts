import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  cusToEdit?: Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((result: Customer[]) => (this.customers = result));
  }

  updateCustomerList(customers: Customer[])
  {
      this.customers = customers;
  }

  initNewCustomer()
  {
    this.cusToEdit = new Customer();
  }

  editCustomer(cus: Customer)
  {
    this.cusToEdit = cus;
  }

}
