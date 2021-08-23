import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';

@Component({
  selector: 'app-change-locaton',
  templateUrl: './change-locaton.component.html',
  styleUrls: ['./change-locaton.component.css']
})
export class ChangeLocatonComponent implements OnInit {

  userlocationModel: any = {};

  userModel: any = {};

  oldLocationInformation: any = {};

  locationMasterForm: FormGroup;

  locationMaster: any = {};

  isLocationMaster: boolean;

  isProcessingLocationMaster: boolean;

  isUserLocation: boolean;

  isUpdate: boolean;

  updatedLocation: any = {};

  isLocationSearch: boolean;

  isNewLocation: boolean;

  constructor(private userService: UserService, private globalutilityService: GobalutilityService) { }

  isProcessing: boolean;

  employeeNumberSearchFrom: FormGroup

  ngOnInit(): void {

    this.employeeNumberSearchFrom = new FormGroup({
      employeeNumber: new FormControl('', Validators.required),
    });

    this.locationMasterForm = new FormGroup({
      locationCode: new FormControl('', Validators.required),
    });

  }

  onLocationUpdateClick() {
    this.praparedUserLocationModelObject();
    this.userService.updateUserDetail(this.userModel).subscribe(success => {
      console.log("Inside success update");
      console.log(success);
      if (success.status === 200) {
        this.updatedLocation = success.body;
        this.isLocationMaster = false;
        this.isUpdate = true;
        this.isNewLocation = true;

        this.globalutilityService.successAlertMessage("Location Updated Successfully");
      }
    },
      error => {
        if (error.status === 417) {
          this.isLocationMaster = false;
          this.isUpdate = false;
          this.globalutilityService.errorAlertMessage("Unable to update location");

        }
      })

  }

  praparedUserLocationModelObject() {
    this.userModel.username = this.oldLocationInformation.username;
    this.userModel.locationCode = this.locationMaster.locationCode;
    this.userModel.locationName = this.locationMaster.locationName;
    this.userModel.locationShortName = this.locationMaster.locationShortName;
  }


  onGetLocationClick() {
    this.isProcessingLocationMaster = true;
    this.userService.getByLocationCode(this.locationMasterForm.value.locationCode).subscribe(success => {
      this.isProcessing = false;
      if (success.status === 200) {
        this.locationMaster = success.body;
        this.isLocationMaster = true;
        this.isProcessingLocationMaster = false;
        this.isUpdate = false;
        this.isNewLocation = false;
        // this.isLocationSearch= true;
        this.resetlocationMasterForm();
        console.log("Getting location master information");
        console.log(success);
        this.reset();
      } if (success.status === 204) {
        this.isProcessingLocationMaster = false;
        this.isLocationMaster = false;
        this.globalutilityService.errorAlertMessage("Location master  not found!!");
        this.resetlocationMasterForm();
      }

    }, error => {
      console.log(error);
      this.isProcessingLocationMaster = false;

      this.isLocationMaster = false;
      this.resetlocationMasterForm();
    })
  }

  searchClicked() {
    console.log("Search Clicked");
    console.log(this.employeeNumberSearchFrom.value);
    this.isProcessing = true;
    this.userService.getUserByUsername(this.employeeNumberSearchFrom.value.employeeNumber).subscribe(success => {
      this.isProcessing = false;
      if (success.status === 200) {
        this.isUserLocation = true;
        this.oldLocationInformation = success.body;
        // this.userlocationModel = this.oldLocationInformation;
        this.isUpdate = false;
        this.isNewLocation = false;
        console.log("Getting User information");
        console.log(this.oldLocationInformation);
        this.reset();
      } if (success.status === 204) {
        this.isUserLocation = false;
        this.globalutilityService.errorAlertMessage("Employee not found!!");
        this.reset();
      }

    }, error => {
      console.log(error);
      this.isProcessing = false;
      this.isUserLocation = false;
      this.reset();
    })
  }

  reset() {
    this.employeeNumberSearchFrom.patchValue({
      employeeNumber: ''
    });
  }

  resetlocationMasterForm() {
    this.locationMasterForm.patchValue({
      locationCode: ''
    });
  }

}
