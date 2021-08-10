import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordform: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) {
  
    this.changePasswordform = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: this.ConfirmedValidator('password', 'confirm_password')
    })
  }

  ngOnInit(): void {
   
  }
    
  get f(){
    return this.changePasswordform.controls;
  }
   
  onSubmitChangePassword(){
    console.log("Getting Change Password Value");
    
    console.log(this.changePasswordform.value);
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
}
