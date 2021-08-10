import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationService } from './services/authorization-service/authorization.service';
import { LoginService } from './services/login/login-service/login.service';
import { LogoutService } from './services/logout/logout-service/logout.service';
import { GlobalConfiguration } from './config/global.config';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthorizationInterceptor } from '../app/interceptor/authorization.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from 'src/app/guard/auth.guard'
import {GlobalConstants} from 'src/app/utility/global.constants';
import { DatePipe } from '@angular/common';
import { UserModule } from './modules/user/user.module'




@NgModule({
  declarations: [
    AppComponent,
   
         ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule
    
     ],
  providers: [
    AuthorizationService,
    LoginService,
    LogoutService,
    GlobalConfiguration,
    GlobalConstants,
    HttpClient,
    AuthGuard,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
