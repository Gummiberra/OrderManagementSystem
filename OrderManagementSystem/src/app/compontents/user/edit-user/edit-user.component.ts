import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { User } from 'src/app/models/user';
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

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['',Validators.required],
      username: ['',Validators.required],
      email: ['',Validators.required],
      role: ['',Validators.required],
      password: [''],
      organizationId: [2] //Set to same org as logged in user
    })
  }

  ngOnChanges(): void {
    console.log(this.user);
    if(this.user !== undefined)
      this.userForm.patchValue({
        name: this.user?.name,
        username: this.user?.username,
        email: this.user?.email,
        role: this.user?.role == '' ?  'Role' : this.user?.role
        
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

