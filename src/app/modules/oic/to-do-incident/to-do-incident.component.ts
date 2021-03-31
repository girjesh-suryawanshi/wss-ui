import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { ToDoIncidentService } from 'src/app/services/project/to-do-incident.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { FileServiceService } from 'src/app/services/project/file-service.service';
import { IncidentStatusService } from 'src/app/services/project/incident-status.service';
import { GlobalConstants } from 'src/app/utility/global.constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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

  constructor(private authorizationService: AuthorizationService, 
    private globalutilityService: GobalutilityService, 
    private todoIncidentMasterService: ToDoIncidentService,
    private filesService:FileServiceService,private IncidentStatusService :IncidentStatusService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.getToDoIncidentByUseranme(this.username);

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
    this.viewToDoIncident = ps;
    this.isView = true;
    this.getFileByIncidentNumber(ps.incidentNumber);
     this.getIncidentStatusByTokenNumber(ps.incidentNumber);
    // this.getByUsernameAndTokenNumber(this.username,ps.tokenNumber);
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
    this.IncidentStatusService.getIncidentStatusByIncidentNumber(incidentNumber).subscribe(success => {

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
