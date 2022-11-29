import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { faUser,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  id = "";
  private sub: any;
  customerForm!: FormGroup;
  userIcon = faUser;
  phoneIcon = faPhone;
  emailIcon = faEnvelope;
  formName = "";
  customer?: Customer;

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      telephone: [''],
      id: ['']

    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
    });

    if(this.id != undefined)
    {
      this.customerService.getCustomer(this.id).subscribe((result: Customer) => (this.customerForm.patchValue({
        name: result.name,
        email: result.email,
        telephone: result.telephone,
        id: result.id
      })));
      this.formName = "Edit user";
      console.log("customer  edit " + this.customer);
    }
    else
    {
      this.customer = new Customer();
      this.formName = "New user"
    }

    console.log("customer " + this.customer);
      
  }

  ngOnChange()
  {
    if(this.customer !== undefined )
    {
      this.customerForm.patchValue({
        name: this.customer.name,
        email: this.customer.email,
        telephone: this.customer.telephone,
        id: this.customer.id
      });
    }
  }

  updateCustomer()
  {
    this.customerService
      .updateCustomer(this.customerForm.value)
      .subscribe((customers: Customer[]) => this.router.navigate(['customers']));
  }

  deleteCustomer()
  {
    this.customerService
      .deleteCustomer(this.customerForm.value)
      .subscribe((customers: Customer[]) => this.router.navigate(['customers']));
  }

  createCustomer()
  {
    this.customerService
      .createCustomer(this.customerForm.value)
      .subscribe((customers: Customer[]) => this.router.navigate(['customers']));
  }

}

