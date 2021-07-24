import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { ToDoIncidentService } from 'src/app/services/project/to-do-incident.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { FileServiceService } from 'src/app/services/project/file-service.service';
import { IncidentStatusService } from 'src/app/services/project/incident-status.service';
import { GlobalConstants } from 'src/app/utility/global.constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestInformationService } from 'src/app/services/project/request-information.service';
import { IncidentMasterService } from 'src/app/services/project/incident-master.service';


@Component({
  selector: 'app-to-do-incident',
  templateUrl: './to-do-incident.component.html',
  styleUrls: ['./to-do-incident.component.css']
})
export class ToDoIncidentComponent implements OnInit {

  loggedInUser: User;
  username: string;
  locationCode: string;
  dtOptions: any = {};
  todoIncidentMasterList: any;
  viewToDoIssue: any;
  isView: boolean;
  viewToDoIncident: any;
  files: any;
  incidentStatusList: any;
  isAttatchMore: boolean;
  attachmentMoreForm: FormGroup;
  isApprove: boolean;
  isRequestInfo: boolean;
  isReject: boolean;
  requestInfoForm: FormGroup;
  approveForm: FormGroup;
  rejectForm: FormGroup;
  requestInfoUser: any;
  requestInfoObject: any = {};
  name: string;
  requestInfoList: any=[];
  isProcessing: boolean;
  isDisable: boolean;
  currentDate: Date;

  constructor(private authorizationService: AuthorizationService, 
      private globalutilityService: GobalutilityService, 
      private todoIncidentMasterService: ToDoIncidentService,
      private filesService:FileServiceService,
      private requestInformationService: RequestInformationService,
      private incidentMaster:IncidentMasterService,
      private incidentStatusService :IncidentStatusService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.name = this.loggedInUser.getName();
    this.getToDoIncidentByUseranme(this.username);

    this.requestInfoForm = new FormGroup({
      remark: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required)

    });

     this.approveForm = new FormGroup({
      comments: new FormControl('', Validators.required),
    });

    this.rejectForm = new FormGroup({
      comments: new FormControl('', Validators.required),
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [10, 25, 50],
      processing: true
    };

   
  }

 

  getToDoIncidentByUseranme(username: string) {
    this.todoIncidentMasterService.getToDoIncidentByAssignUsername(username).subscribe(success => {
      console.log("Inside Success Assign problem found");
      console.log(success);
      if (success.status === 200) {
        console.log("Getting To do incident List");
    
        
        this.todoIncidentMasterList = success.body;
        console.log(this.todoIncidentMasterList);
        
      } else if (success.status === 204) {
        console.log("No content found");
        }

    }, error => {
      console.log("Getting Error while getting assigned problem");
      console.log(error);
    })

  }

  
  public onClickView(ps: any) {
    console.log("Checking Status");
    console.log(ps.status)  
    if (ps.status === 'SUBMITTED') {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
    
    this.viewToDoIncident = ps;
    this.isView = true;
    this.getFileByIncidentNumber(ps.incidentNumber);
     this.getIncidentStatusByTokenNumber(ps.incidentNumber);
    this.getByUsernameAndIncidentNumber(this.username,ps.incidentNumber);
    // this.viewResolveIssueFileClicked(ps);
    // this.viewReopenFileClicked(ps);
    console.log("View Clicked");
    console.log(ps);
  }

  onClickAttatchmentBack() {
    this.isAttatchMore = true;
  }

  onAttatchMoreSubmit(){

  }

  getFileByIncidentNumber(incidentNumber: any) {
    this.filesService.getFileByIncidentNumber(incidentNumber).subscribe(success => {
      console.log(success.body);
      this.files = success.body;
    }, error => {

    })
  }

  getIncidentStatusByTokenNumber(incidentNumber: any) {
    this.incidentStatusService.getIncidentStatusByIncidentNumber(incidentNumber).subscribe(success => {

      if (success.status === 200) {
        this.incidentStatusList = success.body;
        console.log("incident status found");
        console.log(this.incidentStatusList);
      } if (success.status === 204) {
        console.log(success);
      }
    }, error => {
      console.log(error);
    })
  }

  viewFileClicked(file: any) {
    console.log("file view Clicked");
    console.log(file);
    this.filesService.viewFile(file.incidentNumber, file.name, GlobalConstants.FALSE).subscribe(success => {
      this.saveFile(success, file.originalName)
    }, error => {
      this.handleError(error);
    })
  }
 

  public onClickBack() {
    this.isView = false;
  }

  onClickApprove(ps: any) {
    console.log("On click approve");
    console.log(ps);
    this.isReject = false;
    this.isRequestInfo = false;
    this.isApprove = true;
    this.reset();
  }

  onClickResolveBack() {
     this.isReject = false;
    this.isRequestInfo = false;
    this.isApprove = false;
    // this.reset();
  }
  onClickReject(ps: any) {
    this.isReject = true;
    this.isRequestInfo = false;
    this.isApprove = false;
    console.log("Resolve Issue Clicked");
    console.log(ps);
    this.reset();

  }

  onClickRejectBack() {
    this.isReject = false;
    this.isRequestInfo = false;
    this.isApprove = false;

  }

  onClickRequestInfo(viewIssue: any) {
    this.isReject = false;
    this.isRequestInfo = true;
    this.isApprove = false;
    console.log("request info click");
    console.log(viewIssue);
    this.incidentStatusService.getIncidentStatusByIncidentNumber(viewIssue.incidentNumber).subscribe(success => {
      console.log("Get issue status");
      console.log(success);
      this.requestInfoUser = success.body;
      console.log(this.requestInfoUser);

    }, error => {

      console.log("error");
    })
  }

  public onClickRequestInfoBack() {
    this.isRequestInfo = false;
    this.reset();
  }


  reset() {
    this.requestInfoForm.patchValue({
      remark: '',
      user: ''
    });
  }


  onSubmitRequestInfo() {
    this.prepareRequestInfoObject();
    console.log("Request info object");
    console.log(this.requestInfoForm);
    console.log(this.requestInfoForm.value);   
    
    this.requestInformationService.requestInformationToOrigin(this.requestInfoObject).subscribe(success => {
      console.log("Inside success");
      console.log(success);
      if (success.status === 201) {
        this.globalutilityService.successAlertMessage("Request info sent successfully")
        this.reset();
        this.isRequestInfo = false;
        this.isView = false;        
      }
    },
      error => {
        if (error.status === 417) {
          this.globalutilityService.errorAlertMessage("Unable to sent request info");
          this.isRequestInfo = false;
        }

      })
  }

  prepareRequestInfoObject() {
    this.requestInfoObject.incidentNumber = this.requestInfoForm.value.user.incidentNumber;
    this.requestInfoObject.username = this.requestInfoForm.value.user.createdBy;
    this.requestInfoObject.name = this.requestInfoForm.value.user.createdName;
    this.requestInfoObject.requestedUsername = this.username;
    this.requestInfoObject.requestedName = this.name;
    this.requestInfoObject.requestMessage = this.requestInfoForm.value.remark;
    
  }

  getByUsernameAndIncidentNumber(username: any,tokenNumber :any) {
    this.requestInformationService.getByUsernameAndTokenNumber(username,tokenNumber).subscribe(success => {

      console.log("Getting Information List As view Clicked");

      console.log(success);

      console.log(success.body);

      if(success.status === 200){
        this.requestInfoList = success.body;

      }else if(success.status === 204){
        this.requestInfoList =[];
      }

    }, error => {

      console.log("Insise error");
    })

  }

  onApproveSubmit() {
    this.isProcessing = true;
    this.incidentMaster.approveIncidentByIncidentNumber(this.viewToDoIncident.incidentNumber, this.approveForm.value.comments).subscribe(success => {
      if (success.status === 201) {
        this.globalutilityService.successAlertMessage("Issue resolve successfully");
        this.isProcessing = false;
        this.resetApproveForm();
        this.onClickResolveBack();
        this.isView = false;
      }
      this.getToDoIncidentByUseranme(this.username);
    }, error => {
      if (error.status === 417) {
        this.isProcessing = false;
        this.resetApproveForm();
        this.onClickResolveBack();
        this.isView = false;
        this.globalutilityService.errorAlertMessage("Unable to resolve Issue!!");

      }
    })

  }

  resetApproveForm() {
      this.approveForm.patchValue({
      comments: '',     
    });
  }


  onRejectSubmit() {
    this.isProcessing = true;
    this.incidentMaster.rejectIncidentByIncidentNumber(this.viewToDoIncident.incidentNumber, this.rejectForm.value.comments).subscribe(success => {
      if (success.status === 201) {
        this.globalutilityService.successAlertMessage("Incident rejected successfully");
        this.isProcessing = false;
        this.resetRejectForm();
        this.isReject = false;
        this.getToDoIncidentByUseranme(this.username);
        this.onClickResolveBack();
        this.isView = false;
      }
      
    }, error => {
      if (error.status === 417) {
        this.isProcessing = false;
        this.resetRejectForm();
        this.globalutilityService.errorAlertMessage("Unable to reject Incident !!");
      }
    })

  }

  resetRejectForm() {
    this.rejectForm.patchValue({
      comments: ''
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
