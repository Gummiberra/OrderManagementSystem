import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user'
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "user";
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getUser(id:string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public updateUser(user: User): Observable<User[]> {

    return this.http.put<User[]>(`${environment.apiUrl}/${this.url}`,user);
  }

  public createUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/${this.url}/register`,user);
  }

  public deleteUser(user: User): Observable<User[]> {

    return this.http.delete<User[]>(`${environment.apiUrl}/${this.url}/${user.id}`);
  }
}
