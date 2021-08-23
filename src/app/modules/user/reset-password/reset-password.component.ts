import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  employeeNumberSearchFrom: FormGroup
  isProcessing: boolean;

  constructor(private userService: UserService, private globalutilityService: GobalutilityService) { }

  ngOnInit(): void {
    this.employeeNumberSearchFrom = new FormGroup({
      employeeNumber: new FormControl('', Validators.required),
    });
  }

  resetPasswordClicked() {

    console.log("Reset clicked");

    console.log(this.employeeNumberSearchFrom.value);



    this.isProcessing = true;
    this.userService.resetUserByUsername(this.employeeNumberSearchFrom.value.employeeNumber).subscribe(success => {

      console.log("Inside Success");

      console.log(success.body);


      this.isProcessing = false;
      if (success) {

        this.globalutilityService.successAlertMessage("Password Reset Succesfully !!");

        this.reset();
      }
    }, error => {
      if (error) {
        this.isProcessing = false;

        this.globalutilityService.errorAlertMessage("Unable to reset password !!");
        this.reset();
      }
    })
  }

  reset() {
    this.employeeNumberSearchFrom.patchValue({
      employeeNumber: ''
    });
  }

}
