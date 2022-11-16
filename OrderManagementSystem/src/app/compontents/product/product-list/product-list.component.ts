import { Component, OnInit } from '@angular/core';
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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((result: Product[]) => (this.products = result));
  }

  updateProductList(products: Product[])
  {
    this.products = products;
  }

  initNewProduct()
  {
    this.productToEdit = new Product();
  }

  editProduct(product: Product)
  {
    this.productToEdit = product;
  }
}
