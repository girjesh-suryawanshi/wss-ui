import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { IncidentMasterService } from 'src/app/services/project/incident-master.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';

@Component({
  selector: 'app-view-incident',
  templateUrl: './view-incident.component.html',
  styleUrls: ['./view-incident.component.css']
})
export class ViewIncidentComponent implements OnInit {
  loggedInUser: import("d:/nodeworkspace/wss-ui/src/app/models/user.model").User;
  username: string;
  locationCode: string;
  incidentMasterList: any;
  dtOptions: any = {};

  constructor(private authorizationService: AuthorizationService, private globalutilityService: GobalutilityService, private incidentMasterService: IncidentMasterService) { }

  ngOnInit(): void {
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

}
