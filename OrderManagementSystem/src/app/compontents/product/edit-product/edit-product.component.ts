import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() product?: Product;
  @Output() productsUpdated = new EventEmitter<Product[]>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  updateProduct(product:Product)
  {
    this.productService
      .updateProduct(product)
      .subscribe((products: Product[]) => this.productsUpdated.emit(products));
  }

  deleteProduct(product:Product)
  {
    this.productService
      .deleteProduct(product)
      .subscribe((products: Product[]) => this.productsUpdated.emit(products));
  }

  createProduct(product:Product)
  {
    this.productService
      .createProduct(product)
      .subscribe((products: Product[]) => this.productsUpdated.emit(products));
  }
}

