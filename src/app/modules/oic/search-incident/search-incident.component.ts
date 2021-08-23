import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { FileServiceService } from 'src/app/services/project/file-service.service';
import { IncidentStatusService } from 'src/app/services/project/incident-status.service';
import { IssueMasterService } from 'src/app/services/project/issue-master.service';
import { IssueStatusService } from 'src/app/services/project/issue-status.service';
import { GlobalConstants } from 'src/app/utility/global.constants';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';

@Component({
  selector: 'app-search-incident',
  templateUrl: './search-incident.component.html',
  styleUrls: ['./search-incident.component.css']
})
export class SearchIncidentComponent implements OnInit {

  incidentSearchFrom :FormGroup
  isProcessing: boolean;
  statusList: any={};
  isSearch: boolean;
  files: any;
  incidentNumber: any;
  issueStatusList: any;
  incidentStatusList: any;
 

  constructor(private issueMasterService:IssueMasterService,private fileServices:FileServiceService,private incidentStatusService:IncidentStatusService
    , private issueStatusService: IssueStatusService,private globalutilityService: GobalutilityService,private dashboardService: DashboardService) { }

  ngOnInit(): void {

    this.incidentSearchFrom = new FormGroup({
      incidentNumber: new FormControl('', Validators.required),
      });
  }

  searchClicked() {
    this.isProcessing = true;
     this.issueMasterService.getIncidentMasterByIncidentNumber(this.incidentSearchFrom.value.incidentNumber).subscribe(success=>{
      this.isProcessing = false;
      if(success.status === 200){
        this.statusList = success.body;
        this.isSearch = true;
        this.incidentNumber = this.statusList.incidentNumber;
        this.getFileByIncidentNumber(this.incidentNumber);
        this.getIncidentStatusByIncidentNumber(this.incidentNumber);
       this.reset();
      }if(success.status === 204){
        this.globalutilityService.errorAlertMessage("Issue not found with given token number !!");
        this.statusList =[];
        this.reset();
      }

    },error=>{
      console.log(error);
      
      this.isProcessing = false;
      this.reset()

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
  

  reset() {
    
    this.incidentSearchFrom.patchValue({
      incidentNumber: ''     
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
  
  /**
   * Save blob to file
   * @param blob
   */
   saveFile(success: any, fileName: string) {
    if (success) {
      let blob = GobalutilityService.createBlobFromResponse(success);
      this.globalutilityService.saveFile(blob, fileName);
    }
  }

  /**
   * Handle errors
   * @param error
   */
  handleError(error: any) {
    this.globalutilityService.parseStringFromBlob(error.error);
    this.globalutilityService.errorAlertMessage("Unable to download file.");
  }

}
