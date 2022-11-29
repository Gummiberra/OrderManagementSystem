import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product?: Product;
  private sub: any;
  productForm!: FormGroup;
  formName = "";
  userIcon = faUser;
  phoneIcon = faPhone;
  emailIcon = faEnvelope;
  id = "";

  constructor(private productService: ProductService, private router:Router,private route: ActivatedRoute, private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [Number],
      price: [Number],
      organizationId: [this.auth.getOrganization()],
      id: [null]

    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
    });

    if(this.id != undefined)
    {
      this.productService.getProduct(this.id).subscribe((result: Product) => (this.productForm.patchValue({
        name: result.name,
        quantity: result.quantity,
        price: result.price,
        organizationId: result.organizationId,
        id: result.id
      })));
      this.formName = "Edit product";
    }
    else
    {
      this.product = new Product();
      this.formName = "New product"
    }
  }

  updateProduct()
  {
    this.productService
      .updateProduct(this.productForm.value)
      .subscribe((products: Product[]) => this.router.navigate(['products']));
  }

  deleteProduct()
  {
    this.productService
      .deleteProduct(this.productForm.value)
      .subscribe((products: Product[]) => this.router.navigate(['products']));
  }

  createProduct()
  {
    this.productService
      .createProduct(this.productForm.value)
      .subscribe((products: Product[]) => this.router.navigate(['products']));
  }
}

