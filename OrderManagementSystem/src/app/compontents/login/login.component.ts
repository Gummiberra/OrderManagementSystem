import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEyeSlash,faEye,faLock,faUser,faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon = faEyeSlash;
  lockIcon = faLock;
  userIcon = faUser;
  boxIcon = faBoxOpen;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toast: NgToastService) { 
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPassword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = faEye : this.eyeIcon = faEyeSlash;
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value)
        .subscribe({
          next:(res=>{
            this.loginForm.reset();
            this.authService.storeToken(res.token);
            console.log(this.authService.getRole());
            this.toast.success({detail:"Success", summary:res.message, duration: 5000});
            this.router.navigate(['dashboard'])
          })
          ,error: (err=>{
            this.toast.error({detail:"Error", summary:err.error.message, duration: 5000});
          }) 
        })
    }else{
      ValidateForm.validateAllFormFields(this.loginForm);

      alert("Login form is invalid");
    }
  }

  
}
