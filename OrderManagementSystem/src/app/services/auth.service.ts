import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "user";
  private jwtHelper : JwtHelperService
  constructor(private http: HttpClient, private router: Router) { 
    this.jwtHelper = new JwtHelperService();
  }

  login(loginObj: any){

    return this.http.post<any>(`${environment.apiUrl}/${this.url}/authenticate`,loginObj);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue:string){
    localStorage.setItem("access_token",tokenValue);
  }

  getToken(){
    return localStorage.getItem("access_token");
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("access_token") + '';
    return !!localStorage.getItem("access_token") && !this.jwtHelper.isTokenExpired(token);

  }

  getRole(){
    const jwt = new JwtHelperService();
    const token = localStorage.getItem("access_token") + '';
    let decodedToken = jwt.decodeToken(token);
    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  getOrganization(){
    const jwt = new JwtHelperService();
    const token = localStorage.getItem("access_token") + '';
    let decodedToken = jwt.decodeToken(token);
    return decodedToken["OrgID"];
  }

}
