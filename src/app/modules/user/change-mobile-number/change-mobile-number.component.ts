import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RxwebValidators, ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { UserService } from 'src/app/services/users/user.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';

@Component({
  selector: 'app-change-mobile-number',
  templateUrl: './change-mobile-number.component.html',
  styleUrls: ['./change-mobile-number.component.css']
})
export class ChangeMobileNumberComponent implements OnInit {

  isProcessing: boolean;

  oldLocationInformation: any;

  isUserLocation: boolean;

  isEdit: boolean;

  isUpdate: boolean;

  updatedMobileNumber: any;

  isUpdatedMobileNumber: boolean;

  userMobileNoFormGroup: FormGroup;

  employeeNumber: any;

  constructor(private userService: UserService, private globalutilityService: GobalutilityService, private formBuilder: FormBuilder) { }

  employeeNumberSearchFrom: FormGroup

  ngOnInit(): void {

    this.employeeNumberSearchFrom = new FormGroup({
      employeeNumber: new FormControl('', Validators.required),
    });

    this.userMobileNoFormGroup = this.formBuilder.group({
      updatedMobileNumber: ['', RxwebValidators.pattern({ expression: { 'onlyDigit': /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/ } })],
    });

    ReactiveFormConfig.set({ "validationMessage": { "onlyDigit": "Enter valid mobile number" } });

  }



  OnClickEdit() {
    this.isUpdate = true;
    this.isEdit = true;
    this.isUpdatedMobileNumber = true;
  }
  OnclickUpdate() {

    this.oldLocationInformation.mobileNumber = this.userMobileNoFormGroup.value.updatedMobileNumber;
    console.log("After update Clicked");
    console.log(this.oldLocationInformation);
    this.updateUserMobileNumber();


  }
  updateUserMobileNumber() {
    this.userService.updateUserMobileNumber(this.oldLocationInformation).subscribe(success => {
      console.log("Inside updateUserMobileNumber ");
      console.log(success);
      if (success.status === 200) {
        this.isUpdatedMobileNumber = false;
        this.isEdit = false;
        this.isUpdate = false;
        this.resetMobileForm();

        this.globalutilityService.successAlertMessage("Mobile Number Updated Successfully");
      }
    },
      error => {
        if (error.status === 417) {
          this.isUpdatedMobileNumber = false;
          this.isEdit = false;
          this.isUpdate = false;
          this.resetMobileForm();
          this.globalutilityService.errorAlertMessage("Unable to update Mobile number");


        }
      })
  }

  onMobileNumberChange() {
    this.oldLocationInformation.mobileNumber = this.updatedMobileNumber;
  }

  searchClicked() {
    this.isProcessing = true;
    this.employeeNumber = this.employeeNumberSearchFrom.value.employeeNumber;
    this.userService.getUserByUsername(this.employeeNumber).subscribe(success => {
      this.isProcessing = false;
      if (success.status === 200) {
        this.isUserLocation = true;
        this.oldLocationInformation = success.body;
        this.updatedMobileNumber = this.oldLocationInformation.mobileNumber;
        this.reset();
      } else if (success.status === 204) {
        this.isUserLocation = false;
        this.globalutilityService.errorAlertMessage("Employee not found!!");
        this.reset();
      }

    }, error => {
      if (error.status === 417) {
        this.isProcessing = false;
        this.isUserLocation = false;
        this.globalutilityService.errorAlertMessage("Employee not found!!");
        this.reset();
      }
    })
  }

  reset() {
    this.employeeNumberSearchFrom.patchValue({
      employeeNumber: ''
    });
  }

  resetMobileForm() {
    this.userMobileNoFormGroup.patchValue({
      updatedMobileNumber: ''
    });
  }
}
