import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignInGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router, private toast: NgToastService){}
  
  canActivate():boolean
  {
    if(this.authService.isLoggedIn())
    {
      this.toast.info({detail:"Redirected", summary:"You are already logged in!"});
      this.router.navigate(['dashboard']);
      return false;
    } else {
      return true;
    }
  }
  
}
