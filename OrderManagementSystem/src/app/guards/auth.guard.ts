import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router, private toast: NgToastService){}


  canActivate():boolean{   
    if(this.authService.isLoggedIn())
      return true;
    else
    {
      this.toast.error({detail:"Error", summary:"Please login first!"});
      this.router.navigate(['login']);
      return false;
    }
      
  }
  
}
