import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  logout()
  {
    this.authService.logout();
  }
  
  isAuthenticated(){
    
    return this.authService.isLoggedIn();
  }


}
