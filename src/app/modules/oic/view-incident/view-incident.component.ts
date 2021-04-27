import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { IncidentMasterService } from 'src/app/services/project/incident-master.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { FileServiceService } from 'src/app/services/project/file-service.service';
import { IncidentStatusService } from 'src/app/services/project/incident-status.service';
import { User } from 'src/app/models/user.model';
import { GlobalConstants } from 'src/app/utility/global.constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-incident',
  templateUrl: './view-incident.component.html',
  styleUrls: ['./view-incident.component.css']
})
export class ViewIncidentComponent implements OnInit {
  loggedInUser:User;
  username: string;
  locationCode: string;
  incidentMasterList: any;
  dtOptions: any = {};
  isView: boolean;
  viewIncident: any;
  files: any;
  incidentStatusList: any;
  isAttatchMore: boolean;
  attachmentMoreForm: FormGroup;
  uploadFiles: any[];
  isProcessing: boolean;
  isSubmitted: boolean;

  constructor(private authorizationService: AuthorizationService, private globalutilityService: GobalutilityService, private incidentMasterService: IncidentMasterService,
    private fileServices:FileServiceService,private incidentStatusService:IncidentStatusService) { }

  ngOnInit(): void {
     
    this.attachmentMoreForm = new FormGroup({
      comments: new FormControl('', Validators.required),
      isAttachment :new FormControl(false)
    });

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.getIncidentByUseranmeAndLocationcode(this.username, this.locationCode);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [10, 25, 50],
      processing: true
    };
  }

  getIncidentByUseranmeAndLocationcode(username: string, locationCode: string) {
    this.incidentMasterService.getIncidentByUsernameAndLocationCode(username, locationCode).subscribe(success => {
      console.log("Inside Success Assign problem found");
      console.log(success);
      if (success.status === 200) {
        console.log("Getting incident Status");
    
        
        this.incidentMasterList = success.body;
        console.log(this.incidentMasterList);
        
      } else if (success.status === 204) {
        console.log("No content found");
        }

    }, error => {
      console.log("Getting Error while getting assigned problem");
      console.log(error);
    })

  }

  public onClickView(incidentMaster: any) {
    this.viewIncident = incidentMaster;
    if(this.viewIncident.status==='SUBMITTED'){
      this.isSubmitted = true;
    }else{
      this.isSubmitted = false;
    }

    this.isView = true;
    this.getFileByIncidentNumber(incidentMaster.incidentNumber);
    this.getIncidentStatusByIncidentNumber(incidentMaster.incidentNumber);      
  }

  isAttachmentClicked(){
    this.attachmentMoreForm.get('isAttachment').valueChanges.subscribe(checked => {
      if (checked) {
        const validators = [Validators.required];
        this.attachmentMoreForm.addControl('attachment', new FormControl('', validators));
      } else {
        this.attachmentMoreForm.removeControl('attachment');
      }

    });

  }

  
  onFileChange(event){

    this.uploadFiles = [];

    const size = event.srcElement.files[0].size;

    console.log(size)

    if (size < 1000000) 
    { 
     if(event.target.files.length <=10){
           
      for (var i = 0; i < event.target.files.length; i++) {
        this.uploadFiles.push(event.target.files[i]);
      }
    } else{
        this.globalutilityService.errorAlertMessage("Maximum 2 File Allow to upload");
      }

    }else{
    this.globalutilityService.errorAlertMessage("File Size greater 1 Mb");
    }
  }

  deleteFieldValue(index) {
    if (this.uploadFiles.length <= 1) {
      this.uploadFiles.splice(index, 1);
      this.resetFile();
    } else {
      this.uploadFiles.splice(index, 1);
    }
  }

    
  resetFile() {
    this.attachmentMoreForm.patchValue({
      attachment: '',
    });

  }
 
  getIncidentStatusByIncidentNumber(incidentNumber: any) {
    this.incidentStatusService.getIncidentStatusByIncidentNumber(incidentNumber).subscribe(success => {

      if (success.status === 200) {
        console.log("Getting Current incident Status of problem by incident number");
        this.incidentStatusList = success.body;
        console.log(this.incidentStatusList);
       }if (success.status === 204) {
        console.log(success);
      }
    }, error => {
      console.log(error);
    })
  }
  

  getFileByIncidentNumber(incidentNumber: any) {

    this.fileServices.getFileByIncidentNumber(incidentNumber).subscribe(success => {

      console.log("Getting File");

      console.log(success.body);

      this.files = success.body;

    }, error => {
      console.log("Getting Error");
      console.log(error);
    })

  }


  onAttatchMoreSubmit() {
    this.isProcessing = true;
    this.fileServices.attachMoreFileByIncidentNumber(this.viewIncident.incidentNumber, this.attachmentMoreForm.value.comments,this.uploadFiles).subscribe(success => {
      console.log("Inside success");

      console.log(success);

      console.log(success.body);
      
      
      
      if (success.status === 201) {
        this.globalutilityService.successAlertMessage("File Upload successfully");
        this.isProcessing = false;
         this.resetAttachMoreForm();
         this.attachMoreFileBack();
         this.getFileByIncidentNumber(this.viewIncident.incidentNumber);
      }
      // this.getAllAssignedProblemStatement(this.username);
    }, error => {
      
      if (error.status === 417) {
        this.isProcessing = false;
        this.resetAttachMoreForm();
        this.attachMoreFileBack();
        this.isView = false;
        this.globalutilityService.errorAlertMessage("Unable to Upload file!!");
      }
    })
  }
  attachMoreFileBack() {
    this.isAttatchMore = false;
  }

  public onClickBack() {
    this.isView = false;

  }

  resetAttachMoreForm() {
    this.uploadFiles = [];
    this.attachmentMoreForm.patchValue({
      comments: '',
      isAttachment:''
    });
  }

  viewFileClicked(file: any) {
    console.log("file view Clicked");
    console.log(file);
    this.fileServices.viewFile(file.incidentNumber, file.name, GlobalConstants.FALSE).subscribe(success => {
      this.saveFile(success, file.originalName)
    }, error => {
      this.handleError(error);
    })
  }

  onClickAttachmentMore(){
    this.isAttatchMore = true;
  }

  onClickAttatchmentBack(){
    this.isAttatchMore = false;
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
