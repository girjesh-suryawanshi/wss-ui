import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  loggedInUser: User;

  userModal: User;

  public user: any = {};

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
    private authorizationService: AuthorizationService, private globalutilityService: GobalutilityService) {

    this.changePasswordform = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: this.ConfirmedValidator('password', 'confirm_password')
    })
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
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

  ngOnInit(): void {

    this.loggedInUser = this.authorizationService.getLoggedInUser();

    this.userModal = this.loggedInUser;
  }

  onSubmitChangePassword() {
    this.userModal.setPassword(this.changePasswordform.value.password)
    this.updatePassword();
  }

  private updatePassword() {
    this.userService.updatePassword(this.userModal, false).subscribe(result => {
      if (result) {
        this.globalutilityService.successAlertMessage("Password Upadted Succesfully");
        this.resetChangePasswordForm();
        this.router.navigate(['oic']);
        this.logout();
      }
    }, error => {
      this.globalutilityService.errorAlertMessage("Error While Updating Password");
      this.resetChangePasswordForm();
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

  get f() {
    return this.changePasswordform.controls;
  }

  resetChangePasswordForm() {
    this.changePasswordform.patchValue({
      password: '',
      confirm_password: ''
    });

  }

}
