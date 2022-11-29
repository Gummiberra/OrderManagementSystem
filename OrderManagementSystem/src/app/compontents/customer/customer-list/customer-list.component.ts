import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((result: Customer[]) => (this.customers = result));
    console.log(this.customers);
  }

  editCustomer(cus : Customer) {
    if(cus)
    {
      this.router.navigate(['customer' , cus.id]);
    }
  }

  updateCustomerList(customers: Customer[])
  {
      this.customers = customers;
  }

  initNewCustomer()
  {
      this.router.navigate(['customer']);
  }

  /*editCustomer(cus: Customer)
  {
    this.cusToEdit = cus;
  }*/

}
