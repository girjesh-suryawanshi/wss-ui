import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { RequestInformationService } from 'src/app/services/project/request-information.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import {RequestInfo} from 'src/app/models/request-info'
import {RequestInfoService} from 'src/app/services/project/request-info.service'
import { GlobalConstants } from 'src/app/utility/global.constants';

@Component({
  selector: 'app-request-notification',
  templateUrl: './request-notification.component.html',
  styleUrls: ['./request-notification.component.css']
})
export class RequestNotificationComponent implements OnInit {

  loggedInUser: User;
  username: string;
  isReply : boolean;
  requestInfo: any =[];
  replyForm :FormGroup;
  viewRequest:any;
  file: File;
  uploadFiles: File[] = [];
  requestModel :RequestInfo;
  requestInfoList:any =[];
  replyInfoList :any =[];
  isRequestedUser:boolean;
  isRequestInformation :boolean;
  viewResponse: any;
  isViewResponse:boolean;
  requestInformationFile: any =[];
  requestInformationReply: any;
  dtOptions: any = {};

  constructor(private authorizationService: AuthorizationService,private requestInfoService:RequestInfoService,private globalutilityService : GobalutilityService, private requestInformationService: RequestInformationService, private globalUtilityService: GobalutilityService) { }

  ngOnInit(): void {
    this.replyForm = new FormGroup({
      replyMessage: new FormControl('', Validators.required),
      isAttachment :new FormControl(false),
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    };

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.getRequestInformationByUsernameIsReplyFalse(this.username,false);
    this.getReplyRequestInformationByUsernameAndIsReply(this.username,true);
    this.getDistinctResponseInforamtionByRequestedUsernameAndIsReplyTrue(this.username,true);
    // this.getByRequestedUsernameAndIsReplyTrue(this.username,true);
  }

  getRequestInformationByUsernameIsReplyFalse(username: string,isReply:boolean) {
    this.requestInformationService.getRequestInformationByUsernameAndIsReply(username,isReply).subscribe(success => {
      console.log("Getting request information by login user name and is reply false");
      console.log(success);
      this.requestInfo = success.body;
    }, error => {
      console.log("Getting Error while retrive request information by user name")
    })

  }

  getReplyRequestInformationByUsernameAndIsReply(username: string,isReply:boolean) {
    this.requestInformationService.getDistinctRequestInformationByUsernameAndIsReply(username,isReply).subscribe(success => {
      console.log("Getting Reply request information by username and is reply true");
      console.log(success);
      this.replyInfoList = success.body;
    }, error => {
      console.log("Getting Error while retrive request information by user name")
    })

  }

   getByRequestedUsernameAndIsReplyTrue(username: any,isReply:boolean) {

    this.requestInformationService.getByRequestedUsernameAndIsReply(username,true).subscribe(success => {

      console.log("Getting request information by requested username and is reply true");

      console.log(success);

      this.requestInfoList = success.body;

    }, error => {

      console.log("Inside error");
    })

  }

  getDistinctResponseInforamtionByRequestedUsernameAndIsReplyTrue(username: any,isReply:boolean) {

    this.requestInformationService.getByRequestedUsernameAndIsReply(username,true).subscribe(success => {

      console.log("Getting request information by requested username and is reply true");

      console.log(success);

      this.requestInfoList = success.body;

    }, error => {

      console.log("Inside error");
    })

  }

  onClickViewResponse(info:any){
    console.log("view Response clixked");
    console.log(info);
    this.viewResponse =info;
    this.isRequestedUser =true;
    this.isViewResponse = true;
    this.getFileByTokenNumber(info.incidentNumber);
    this.getRequestInformationByTokennumberAndIsReplyTrue(info.incidentNumber,true);
    }


  getRequestInformationByTokennumberAndIsReplyTrue(incidentNumber: any, isReply: boolean) {
    this.requestInformationService.getRequestInformationReplyByTokenNumberAndIsReplyTrue(incidentNumber,isReply).subscribe(success=>{
      console.log("Inside Succes getRequestInformationByTokennumberAndIsReplyTrue");
      if(success.status === 200){
        
        
       this.requestInformationReply = success.body; 
       console.log( this.requestInformationReply);
 
      }
      else if(success.status === 204){
      //  this.requestInformationFile = []; 
 
      }
     
     },error=>{
       console.log("Inside Succes");
 
     })
  }

  getFileByTokenNumber(tokenNumber: any) {
    this.requestInformationService.getFileByTokenNumber(tokenNumber).subscribe(success=>{
     console.log("Inside Succes");
     if(success.status === 200){
      this.requestInformationFile = success.body; 

     }
     else if(success.status === 204){
      this.requestInformationFile = []; 

     }
    
    },error=>{
      console.log("Inside Succes");

    })
  }
    onClickViewResponseBack(){
      this.isRequestedUser =false;
    this.isViewResponse = false;
    }

  
  onClickReply(info:any){
    this.isReply= true;
    this.viewRequest = info;
    console.log("reply clicked");
    console.log(info);
    
  }

  onClickReplyBack(){
    this.isReply = false;
  }

  onReplyubmit(){  
    this.preparedRequestObject();
    let index = this.requestInfo.indexOf(this.viewRequest);
    this.requestInfoService.insertRequestInfo(this.requestModel, this.uploadFiles).subscribe(success => {
      if (success.status === 201) {
        this.getReplyRequestInformationByUsernameAndIsReply(this.username,true);
        this.requestInfo.splice(index, 1);
         this.resetReplyForm();
         this.globalutilityService.successAlertMessage("Reply submited Successfully");
      }
    }, error => {
      if(error.status ===417){
        this.globalutilityService.errorAlertMessage("Unable to submit reply");
        this.resetReplyForm();
      }
     })
    
  
  }

  preparedRequestObject(){
    this.requestModel = new RequestInfo();
    this.requestModel.setId(this.viewRequest.id);
    this.requestModel.setIncidentNumber(this.viewRequest.incidentNumber);
    this.requestModel.setUsername(this.viewRequest.username);
    this.requestModel.setName(this.viewRequest.name);
    this.requestModel.setRequestedUsername(this.viewRequest.requestedUsername);
    this.requestModel.setRequestedName(this.viewRequest.requestedName);
    this.requestModel.setRequestMessage(this.viewRequest.requestMessage);
    this.requestModel.setResponseMessage(this.replyForm.value.replyMessage);
  }

  onFileChange(event){

    this.uploadFiles = [];

    const size = event.srcElement.files[0].size;

    console.log(size)

    if (size < 1000000) 
    { 
     if(event.target.files.length <=2){
           
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

  
  isAttachmentClicked(){
    this.replyForm.get('isAttachment').valueChanges.subscribe(checked => {
      if (checked) {
        const validators = [Validators.required];
        this.replyForm.addControl('attachment', new FormControl('', validators));
      } else {
        this.replyForm.removeControl('attachment');
      }

    });

  }

  deleteFieldValue(index) {
    if (this.uploadFiles.length <= 1) {
      this.uploadFiles.splice(index, 1);
      this.resetFile();
    } else {
      this.uploadFiles.splice(index, 1);
    }
  }

  onClickViewFile(file:any){
    console.log("file view Clicked");
    console.log(file);
    this.requestInformationService.viewFile(file.incidentNumber, file.name, GlobalConstants.FALSE).subscribe(success => {
      this.saveFile(success, file.originalName)
    }, error => {
      this.handleError(error);
    })
  }


  /**
   * Save blob to file
   * @param blob
   */
  saveFile(success: any, fileName: string) {
    if (success) {
      // this.exportType ="pdf"
      let blob = GobalutilityService.createBlobFromResponse(success);
      this.globalUtilityService.saveFile(blob, fileName);
      // this.reset();
    }
  }

  /**
   * Handle errors
   * @param error
   */
  handleError(error: any) {
    this.globalUtilityService.parseStringFromBlob(error.error);
    // this.reset();
    this.globalUtilityService.errorAlertMessage("Unable to download file.");
  }


  
  resetFile() {
    this.replyForm.patchValue({
      attachment: '',
    });
  }
  
  resetReplyForm() {
    this.uploadFiles = [];
    this.replyForm.patchValue({
      attachment: '',
      replyMessage:'',
      isAttachment:''
    });

  }


  

}
