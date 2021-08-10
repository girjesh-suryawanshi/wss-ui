import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import {ChangePasswordComponent} from './change-password/change-password.component'

import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserModule,
    HttpClientModule
  ]
})
export class UserModule { }
