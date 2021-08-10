import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { UserService } from 'src/app/services/users/user.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordform: FormGroup = new FormGroup({});

  public readonly LOGOUT_STANDBY_IN_SECONDS: number = 3;
  
  loggedInUser:User;

  userModal :User;

  public user: any = {};
  
  constructor(private fb: FormBuilder,private userService:UserService,private authorizationService:AuthorizationService) {
  
    this.changePasswordform = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: this.ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit(): void {
    
    this.loggedInUser = this.authorizationService.getLoggedInUser();

    this.userModal = this.loggedInUser;

    // if (this.loggedInUser) {
    //   this.user['username'] = this.loggedInUser.getUsername();
    // }
   
  }
    
  get f(){
    return this.changePasswordform.controls;
  }
   
  onSubmitChangePassword(){
    console.log("Getting Change Password Value");
    console.log("Before password set");
    console.log(this.loggedInUser);
    this.userModal.setPassword(this.changePasswordform.value.password) 
    console.log("After password set");
    console.log(this.userModal);
    
    console.log(this.changePasswordform.value);
    
    
    console.log(this.changePasswordform.value.password);
    
    // this.updatePassword();
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }

  }

  private updatePassword() {
   
      this.userService.updatePassword(this.user, false).subscribe(result => {
        if (result) {
          console.log("password updated successfully");
          this.logout();
        }
      }, error => {
        console.log("Error while updating user password");
        console.log(error);
        });
    }   

    private logout() {
      console.log("logout() called");
      let logout = setInterval(() => {
        this.authorizationService.setSessionEndTime(null);
        if (logout) {
          clearInterval(logout);
        }
      }, this.LOGOUT_STANDBY_IN_SECONDS * 1000);
    }

}
