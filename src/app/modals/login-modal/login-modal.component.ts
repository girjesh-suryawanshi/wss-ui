import { Component, Input, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization-service/authorization.service';
import { FormGroup, FormControl, Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { User } from '../../models/user.model';
import { OtpService } from 'src/app/services/OTP/otp.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  private readonly CLASS_NAME = "LoginModalComponent : ";

  modalInstance: any;
  username;
  isRelogin:boolean;

  readonly INVALID_LOGIN_MESSAGE = "Invalid Username/Password. Try Again !";
  readonly UNABLE_LOGIN_MESSAGE = "Unable to Login. Try Again !";

  logging = false;
  authenticated = false;
  loginError = false;
  loginErrorText;
  user;
  isOtpResend: boolean;
  isResend: boolean;
  timeLeft: number = 120;
  durationMillisecond: number;
  otpSend: boolean;
  form: FormGroup = new FormGroup({});
  interval: number;
  loggedUser: User;

  constructor(private authorizationService : AuthorizationService,private otpService: OtpService, private globalutilityService: GobalutilityService,
    private fb: FormBuilder,private router: Router) { 
      this.form = fb.group({
        number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
      })

    }

  ngOnInit() {
    console.log(this.CLASS_NAME + "ngOnInit called")
    let loggedInUser = this.authorizationService.getLoggedInUser();
    if(loggedInUser){
      this.username = loggedInUser.getUsername();
    }else{
      console.error(this.CLASS_NAME + "loggedInUser found NULL");
    }

    this.user = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('',Validators.required)
    });

    console.log(this.CLASS_NAME + "Loging out session");
    this.authorizationService.sessionLogout();
  }

  /**
   * Function which will be called by Angular 
   * when setting modalInstance attribute on this components
   * selector
   */
  @Input("modalInstance")
  set setModalInstance(modalInstance : any){
    this.modalInstance = modalInstance;
  }

  processLoginForm() {
    console.log(this.CLASS_NAME + "Process Login Form started");
    //console.log(this.user.value);
    this.logging = true;
    //console.log('Authentication started for user ');
    let user = new User(this.user.value);
    user.setUsername(this.username);
    console.log(this.CLASS_NAME + "Authenticated user made from form control as: ");
    console.log(user);
    this.authorizationService.authenticate(user).subscribe(data => {
        //let status = data.status;
        let status = (<any>data).status;
        if(status === 200){
          console.log(this.CLASS_NAME + "Re Login Successfull. Logged in User is: ");
          if(this.authorizationService.isLogedIn()){
            this.isRelogin = true;
            this.loggedUser = this.authorizationService.getLoggedInUser();
            // this.generateOTP();
            this.modalInstance.close("Logged In successfully");
          }else {
            console.log(this.CLASS_NAME + "Unable to login user");
            this.loginError = true;
            this.loginErrorText = this.UNABLE_LOGIN_MESSAGE;
          }
        }
        this.logging = false;
     }, error => {
       this.logging = false;
       this.loginError = true;
       console.log(this.CLASS_NAME + "Error While login");
       console.log(error);
       let status = error.status;
       if(status == 403 || status == 401){
         this.loginErrorText = this.INVALID_LOGIN_MESSAGE;
         if(error.error){
          this.loginErrorText = error.error;
        }
       }else{
         this.loginErrorText = this.UNABLE_LOGIN_MESSAGE;
       }
     });
  }

  generateOTP() {
    this.otpService.generateOTP().subscribe(success => {
      console.log("Inside success generating otp");
      if (success.status === 200) {
        // this.globalutilityService.successAlertMessage("OTP Sent Successfully !!")
        this.otpSend = false;
        this.durationMillisecond = 1000;
        this.startTimer();

      }
    }, error => {
      this.globalutilityService.errorAlertMessage("Error While Generating OTP");

    })
  }


  processOtpForm() {
    this.otpService.validateOTP(this.form.value.number).subscribe(success => {
      if (success.status === 200) {

        localStorage.setItem("key", "SUCCESS");
         
        this.modalInstance.close("Logged In successfully");
        // this.router.navigate(['oic']);
      }

    }, error => {
      if (error.status === 400) {
        this.globalutilityService.successAlertMessage("Enter OTP is not valid !!")
        localStorage.setItem("key", "FAIL");
      } else if (error.status === 401) {
        localStorage.setItem("key", "FAIL");
        this.globalutilityService.successAlertMessage("OTP has been expired !!");
      } else if (error.status === 417) {
        localStorage.setItem("key", "FAIL");
        this.globalutilityService.successAlertMessage("Enter OTP is not matched !!");
      }
    })
  }

  onClickResendOTP() {

    this.otpService.generateOTP().subscribe(success => {
      console.log("Inside success generating otp");
      // console.log(success.body);
      if (success.status === 200) {
        console.log("OTP Generated Successfully");
        this.isOtpResend = true;
        this.isResend = false;
        this.timeLeft = 120;
        this.durationMillisecond = 10000;
        this.startTimer();

      }
    }, error => {
      console.log("Error while generating OTP");

    })
  }

  get f() {
    return this.form.controls;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.otpSend = false;
      } else {
        // this.timeLeft = 10;
        this.isResend = true;
        this.isOtpResend = true;
      }
    }, this.durationMillisecond)
  }

  public logoutClicked(){
    console.log(this.CLASS_NAME + "logoutClicked called");
    if(this.modalInstance){
      this.modalInstance.dismiss("logout");
    }
  }

}
