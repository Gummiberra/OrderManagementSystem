import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private url = "order";

  constructor(private http: HttpClient)
  {

  }

  public getOrders(): Observable<Order[]> {

    return this.http.get<Order[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getOrder(id:string): Observable<Order> {

    return this.http.get<Order>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public updateOrder(order: Order): Observable<Order[]> {

    return this.http.put<Order[]>(`${environment.apiUrl}/${this.url}`,order);
  }

  public createOrder(order: Order): Observable<Order[]> {

    return this.http.post<Order[]>(`${environment.apiUrl}/${this.url}`,order);
  }

  public deleteOrder(order: Order): Observable<Order[]> {

    return this.http.delete<Order[]>(`${environment.apiUrl}/${this.url}/${order.id}`);
  }
}
