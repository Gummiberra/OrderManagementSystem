import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = "customer";
  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateCustomer(cus: Customer): Observable<Customer[]> {

    return this.http.put<Customer[]>(`${environment.apiUrl}/${this.url}`,cus);
  }

  public createCustomer(cus: Customer): Observable<Customer[]> {

    return this.http.post<Customer[]>(`${environment.apiUrl}/${this.url}`,cus);
  }

  public deleteCustomer(cus: Customer): Observable<Customer[]> {

    return this.http.delete<Customer[]>(`${environment.apiUrl}/${this.url}/${cus.id}`);
  }
}
