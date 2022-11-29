import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productToEdit?: Product;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((result: Product[]) => (this.products = result));
  }

  updateProductList(products: Product[])
  {
    this.products = products;
  }

  initNewProduct()
  {
    this.router.navigate(['product']);
  }

  editProduct(product: Product)
  {
    this.router.navigate(['product',product.id]);
  }
}
