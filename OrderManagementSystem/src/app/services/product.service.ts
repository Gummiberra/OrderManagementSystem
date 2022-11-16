import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "product";

  constructor(private http: HttpClient)
  {

  }

  public getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateProduct(prod: Product): Observable<Product[]> {

    return this.http.put<Product[]>(`${environment.apiUrl}/${this.url}`,prod);
  }

  public createProduct(prod: Product): Observable<Product[]> {

    return this.http.post<Product[]>(`${environment.apiUrl}/${this.url}`,prod);
  }

  public deleteProduct(prod: Product): Observable<Product[]> {

    return this.http.delete<Product[]>(`${environment.apiUrl}/${this.url}/${prod.id}`);
  }
}
