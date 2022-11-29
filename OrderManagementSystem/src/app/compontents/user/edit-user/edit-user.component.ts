import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faEnvelope, faEyeSlash, faPhone, faUser,faLock } from '@fortawesome/free-solid-svg-icons';
import ValidateForm from 'src/app/helpers/validateform';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() user?: User;
  @Output() usersUpdated = new EventEmitter<User[]>();
  userForm!: FormGroup;
  type: string = "password";
  formName = "";
  userIcon = faUser;
  phoneIcon = faPhone;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  id = "";
  private sub: any;

  roles = [{name: "", value: ""}];

  private userRole = "";
  private userOrg?: number;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private auth: AuthService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userRole = this.auth.getRole();
    if(this.userRole == "Owner")
    {
      this.roles = [{name:"Admin", value:"Admin"},{name:"User", value:"User"}];
    }else if(this.userRole == "Admin"){
      this.roles = [{name:"User", value:"User"}];
    }
    
    this.userOrg = this.auth.getOrganization();


    this.userForm = this.formBuilder.group({
      name: ['',Validators.required],
      username: ['',Validators.required],
      email: ['',Validators.required],
      role: [null,Validators.required],
      password: [''],
      organizationId: [this.userOrg] //Set to same org as logged in user
    })


    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
    });

    if(this.id != undefined)
    {
      this.userService.getUser(this.id).subscribe((result: User) => (this.userForm.patchValue({
        name: result.name,
        username: result.username,
        email: result.email,
        role: result.role,
        organizationId: result.organizationId,
        id: result.id
      })));
      this.formName = "Edit user";
    }
    else
    {
      this.user = new User();
      this.formName = "New user"
    }
  }

  ngOnChanges(): void {
    console.log(this.user);
    if(this.user !== undefined)
      this.userForm.patchValue({
        name: this.user?.name,
        username: this.user?.username,
        email: this.user?.email,
        role: this.user?.role == '' ?  null : this.user?.role,
        organizationId: this.userOrg
        
      })
    
    
    

    console.log(this.userForm);
  }

  updateUser()
  {
    if(this.user !== null)
    {
      
    }
    this.userService
      .updateUser(this.userForm.value)
      .subscribe((users: User[]) => this.usersUpdated.emit(users));
  }

  deleteUser()
  {
    this.userService
      .deleteUser(this.userForm.value)
      .subscribe((users: User[]) => this.usersUpdated.emit(users));
    
      this.userForm.reset();
  }

  createUser()
  {
    if(this.userForm.valid && this.userForm.value['password'] != "")
    {
      this.userService
        .createUser(this.userForm.value)
        .subscribe((users: User[]) => this.usersUpdated.emit(users));
    }else{
      ValidateForm.validateAllFormFields(this.userForm);
      alert("User form is invalid");
    }
      
  }
}

