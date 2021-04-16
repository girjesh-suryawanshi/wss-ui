import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { IncidentMaster } from 'src/app/models/incidentMaster.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { User } from 'src/app/models/user.model';
import { IncidentMasterService } from 'src/app/services/project/incident-master.service'

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {


  incidentList: any = ['Electrical', 'Non-Electrical'];

  incidentObjectList: any = ['Human', 'Animal'];

  incidentObjectTypeList: any = ['Department', 'Outsider'];

  employeeTypeList: any = ['Regular', 'Contract', 'Outsource'];

  isHuman: boolean;

  isDepartment: boolean;

  incidentMasterModal :IncidentMaster
 
  myFiles: File[] = [];
  isProcessing: boolean;
  loggedInUser: User;
  role: string;
  username: string;
  name: string;
  locationCode: string;
  locationName: string;
  officeType: string;
  incidentNumber: any;



  constructor(private authorizationService: AuthorizationService,private globalutilityService: GobalutilityService,private incidentMasterService:IncidentMasterService) { }

  incidentMasterForm: FormGroup;

  ngOnInit(){

    this.incidentMasterForm = new FormGroup({
      incident: new FormControl('', Validators.required),
      incidentObject: new FormControl('', Validators.required),
      incidentObjectType: new FormControl('', Validators.required),
      employeeType: new FormControl('', Validators.required),
      incidentDescription : new FormControl('', Validators.required),
      isAttachment:new FormControl(false)
    });

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.role = this.loggedInUser.getRole();
    this.username = this.loggedInUser.getUsername();
    this.name = this.loggedInUser.getName();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.locationName = this.loggedInUser.getLocationShortName();
    this.officeType = this.loggedInUser.getOfficeType();
  }

  onChangeIncidentObject() {
    this.resetincidentMasterForm();
    console.log(this.incidentMasterForm.value);
    if (this.incidentMasterForm.value.incidentObject == 'Human') {
      this.isHuman = true;
      const validators = [Validators.required];
      this.incidentMasterForm.addControl('incidentObjectType', new FormControl('', validators));
      this.incidentMasterForm.addControl('employeeType', new FormControl('', validators));
                  
    } else {
      
      this.isHuman = false;
      this.isDepartment = false;
      this.incidentMasterForm.removeControl('incidentObjectType'); 
      this.incidentMasterForm.removeControl('employeeType');      

    }


  }


  onChangeIncidentObjectType() {

    this.resetEmployeeType();

    console.log("incident object type called");

    console.log(this.incidentMasterForm.value.incidentobjecType);
    if (this.incidentMasterForm.value.incidentObjectType == 'Department') {
      this.isDepartment = true;
      const validators = [Validators.required];
       this.incidentMasterForm.addControl('employeeType', new FormControl('', validators));
      
    } else {
      this.isDepartment = false;
      this.incidentMasterForm.removeControl('employeeType');      
           
    }

  }

  isAttachmentClicked() {
    this.incidentMasterForm.get('isAttachment').valueChanges.subscribe(checked => {
      if (checked) {
        const validators = [Validators.required];
        this.incidentMasterForm.addControl('attachment', new FormControl('', validators));
      } else {
        this.incidentMasterForm.removeControl('attachment');
      }

    });
  }


  deleteFieldValue(index) {
    if (this.myFiles.length <= 1) {
      this.myFiles.splice(index, 1);
      this.resetFile();
    } else {
      this.myFiles.splice(index, 1);
    }
  }

  onFileChange(event) {

    this.myFiles = [];

    const size = event.srcElement.files[0].size;

    console.log(size)

    if (size < 1000000) 
    { 
     if(event.target.files.length <=5){
           
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
      }
    } else{
        this.globalutilityService.errorAlertMessage("Maximum 5 File Allow to upload");
      }

    }else{
    this.globalutilityService.errorAlertMessage("File Size greater 1 Mb");
    }

  }

  resetFile() {
    this.incidentMasterForm.patchValue({
      attachment: '',
    });

  }

  resetincidentMasterForm() {
    this.incidentMasterForm.patchValue({
      incidentobjecType: '',
      employeeType: ''

    });
  }

  resetEmployeeType() {
    this.incidentMasterForm.patchValue({
      employeeType: ''

    });
  }
 

  onSubmitIncidentMasterForm() {
    
      this.isProcessing = true;
  
      this.preparedIssueMasterObject();
  
      console.log("Object  prepared received");
      console.log(this.incidentMasterModal);
      this.incidentMasterService.insertIncidentMaster(this.incidentMasterModal, this.myFiles).subscribe(success => {
        if (success.status === 201) {
          this.isProcessing = false;
          this.resetIncidentMasterForm();
          this.incidentNumber = success.body;
          this.isHuman = false;
          this.isDepartment = false;
          this.globalutilityService.successAlertMessage("Incident Registered Successfully With Id:" + this.incidentNumber.incidentNumber);
        }
      }, error => {
        if(error.status ===417){
          this.isProcessing = false;
          this.globalutilityService.errorAlertMessage("Unable to registered incident");
          this.resetIncidentMasterForm();
          this.isHuman = false;
          this.isDepartment = false;
        }
       })
    }
  
    private preparedIssueMasterObject() {
      this.incidentMasterModal = new IncidentMaster();
      this.incidentMasterModal.setUsername(this.username);
      this.incidentMasterModal.setName(this.name);
      this.incidentMasterModal.setLocationCode(this.locationCode);
      this.incidentMasterModal.setLocationName(this.locationName);
      this.incidentMasterModal.setOfficeType(this.officeType);
      this.incidentMasterModal.setIncident(this.incidentMasterForm.value.incident);
      this.incidentMasterModal.setIncidentObject(this.incidentMasterForm.value.incidentObject);
      this.incidentMasterModal.setIncidentObjectType(this.incidentMasterForm.value.incidentObjectType);
      this.incidentMasterModal.setEmpployeeType(this.incidentMasterForm.value.employeeType);
      this.incidentMasterModal.setIncidentDescription(this.incidentMasterForm.value.incidentDescription);
      
  
    }

    resetIncidentMasterForm() {
      this.myFiles = [];
      this.incidentMasterForm.patchValue({
        incident: '',
        incidentObject: '',
        incidentObjectType: '',
        employeeType: '',
        incidentDescription: '',
        attachment: '',
        isAttachment: ''
      });
  
    }
  

}
