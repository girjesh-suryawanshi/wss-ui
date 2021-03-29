import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { ToDoIncidentService } from 'src/app/services/project/to-do-incident.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';

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

  constructor(private authorizationService: AuthorizationService, private globalutilityService: GobalutilityService, private todoIncidentMasterService: ToDoIncidentService) { }

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

}
