import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeMobileNumberComponent } from './change-mobile-number/change-mobile-number.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangeLocatonComponent } from './change-locaton/change-locaton.component';

@NgModule({
  declarations: [ChangePasswordComponent, ChangeMobileNumberComponent, ResetPasswordComponent, ChangeLocatonComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonModule,
    FormsModule,    //import here
    ReactiveFormsModule //import here
    
    
   
   
  ]
})
export class UserModule { }
