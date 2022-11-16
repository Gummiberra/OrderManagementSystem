import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "user";
  constructor(private http: HttpClient) { }

  public login(loginObj: any){

    return this.http.post<any>(`${environment.apiUrl}/${this.url}/authenticate`,loginObj);
  }

}
