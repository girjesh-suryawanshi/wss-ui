import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { IncidentMaster } from 'src/app/models/incidentMaster.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { User } from 'src/app/models/user.model';
import { IncidentMasterService } from 'src/app/services/project/incident-master.service'
import { FileServiceService } from 'src/app/services/project/file-service.service';
import { GlobalConstants } from 'src/app/utility/global.constants';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {


  incidentList: any = ['Electrical', 'Non-Electrical'];

  incidentTypeList: any = ['Fatal', 'Non-Fatal'];

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
  fileTemplateNameList: any;
  templateId: any;
  templateName: any;
  originalTemplateName: any;



  constructor(private authorizationService: AuthorizationService,private globalutilityService: GobalutilityService,private incidentMasterService:IncidentMasterService,
    private templateFileService:FileServiceService) { }

  incidentMasterForm: FormGroup;

  ngOnInit(){

    this.incidentMasterForm = new FormGroup({
      incidentType: new FormControl('', Validators.required),
      incident: new FormControl('', Validators.required),
      incidentObject: new FormControl('', Validators.required),
      incidentObjectType: new FormControl('', Validators.required),
      employeeType: new FormControl('', Validators.required),
      incidentDescription : new FormControl('', Validators.required),
      incidentDate : new FormControl('', Validators.required),
      fileTemplate:new FormControl(false),
      isAttachment:new FormControl(false)
    });

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.role = this.loggedInUser.getRole();
    this.username = this.loggedInUser.getUsername();
    this.name = this.loggedInUser.getName();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.locationName = this.loggedInUser.getLocationShortName();
    this.officeType = this.loggedInUser.getOfficeType();
    this.getAllFileTemplate();
    this.resetTemplateFileDownloader();
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

  removeValidator() {
    this.incidentMasterForm.removeControl('fileTemplate'); 
  }

  onChangeFileTemplate(){
   console.log("OnChange File Template");  
   console.log(this.incidentMasterForm.value.fileTemplate.originalTemplateName);
   this.templateId= this.incidentMasterForm.value.fileTemplate.templateId;
   this.originalTemplateName= this.incidentMasterForm.value.fileTemplate.originalTemplateName;
   }


  onClickdownloadFileTemplate(){
     console.log("download file template Clicked");
     console.log(this.originalTemplateName);
       this.templateFileService.downloadFileTemplate(this.templateId, GlobalConstants.FALSE).subscribe(success => {
        this.saveFile(success, this.originalTemplateName);
        this.resetTemplateFileDownloader();
      }, error => {
        this.handleError(error);
        this.resetTemplateFileDownloader();
      })    

  }


/**This method is used to feched All file template from  database */

  getAllFileTemplate() {
  
    this.templateFileService.getAllFileTemplateName().subscribe(succes => {
      this.fileTemplateNameList = succes.body;
      console.log("Getting template file");
      console.log(this.fileTemplateNameList);
    }, error => {
      console.log("error");
      console.log(error);
    });
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

  resetTemplateFileDownloader() {
    this.incidentMasterForm.patchValue({
      fileTemplate: ''

    });
  }
 

  onSubmitIncidentMasterForm() {
    
    console.log("Onsubmit incident master");
    console.log(this.incidentMasterForm.value);
    
    

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
      this.incidentMasterModal.setIncidentType(this.incidentMasterForm.value.incidentType);
      this.incidentMasterModal.setIncidentDate(this.incidentMasterForm.value.incidentDate);
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
        incidentType:'',
        incidentDate:'',
        incident: '',
        incidentObject: '',
        incidentObjectType: '',
        employeeType: '',
        incidentDescription: '',
        attachment: '',
        isAttachment: ''
      });
  
    }


    /**
   * Save blob to file
   * @param blob
   */
   saveFile(success: any, fileName: string) {
    if (success) {
      // this.exportType ="pdf"
      let blob = GobalutilityService.createBlobFromResponse(success);
      this.globalutilityService.saveFile(blob, fileName);
      // this.reset();
    }
  }

  /**
   * Handle errors
   * @param error
   */
  handleError(error: any) {
    this.globalutilityService.parseStringFromBlob(error.error);
    // this.reset();
    this.globalutilityService.errorAlertMessage("Unable to download file.");
  }

  

}
