import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonModule,
    FormsModule,    //import here
    ReactiveFormsModule //import here
    
    
   
   
  ]
})
export class UserModule { }
