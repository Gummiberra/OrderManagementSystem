import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderItem } from '../models/orderItem';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private url = "orderItem";

  constructor(private http: HttpClient)
  {

  }

  public getOrderItems(): Observable<OrderItem[]> {

    return this.http.get<OrderItem[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getOrderItem(id:string): Observable<OrderItem> {

    return this.http.get<OrderItem>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public updateOrderItem(item: OrderItem): Observable<OrderItem[]> {

    return this.http.put<OrderItem[]>(`${environment.apiUrl}/${this.url}`,item);
  }

  public createOrderItem(item: OrderItem): Observable<OrderItem[]> {

    return this.http.post<OrderItem[]>(`${environment.apiUrl}/${this.url}`,item);
  }

  public deleteOrderItem(item: OrderItem): Observable<OrderItem[]> {

    return this.http.delete<OrderItem[]>(`${environment.apiUrl}/${this.url}/${item.id}`);
  }
}
