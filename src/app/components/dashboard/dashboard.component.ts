
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: User;
  username: any;
  totalIssue: number = 0;
  pendingIssue: number = 0;
  forwardedIssue: number = 0;
  resolveIssue: number = 0;
  rejectedIssue: number;
  totalAssignIssue: number = 0;
  pendingAssignIssue: number = 0;
  forwardAssignIssue: number = 0;
  resolveAssignIssue: number = 0;
  rejectAssignIssue: number = 0;
  statusRejectionList: any = ['REJECTED_DE', 'REJECTED_SE','REJECTED_CE','REJECTED_MD'];
  statusPendingList:any=['SUBMITTED','APPROVED_DE','APPROVED_SE','APPROVED_CE'];
  statusCloseList:any=['CLOSED'];


  constructor(private authorizationService: AuthorizationService, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.countByUsername(this.username);//total count
    this.countByUsernameAndStatusPendingIn(this.username, this.statusPendingList);//total pending count
    this.countByUsernameAndStatusClose(this.username, this.statusCloseList);//total close count
    this.countByUsernameAndStatusRejectIn(this.username, this.statusRejectionList);//otal Rejection count


    this.countByAssignUsername(this.username);
    // this.countByAssignUsernameAndStatusPending(this.username, 'SUBMITTED');
    // this.countByAssignUsernameAndStatusResolve(this.username, 'CLOSED');
    // this.countByAssignUsernameAndStatusForwarded(this.username, 'FORWARDED');
    // this.countByAssignUsernameAndStatusRejected(this.username, 'REJECTED');
  }
  countByAssignUsernameAndStatusRejected(username: any, status: string) {
    this.dashboardService.countByAssignUsernameAndStatus(username, status).subscribe(success => {
      console.log("inside success");
      console.log(success);
      if (success.status === 200) {
        this.rejectAssignIssue = success.body;
      }
      else if (success.status === 204) {
        this.rejectAssignIssue = 0;
      }
    }, error => { })
  }
  countByAssignUsernameAndStatusForwarded(username: any, status: string) {
    this.dashboardService.countByAssignUsernameAndStatus(username, status).subscribe(success => {
      console.log("inside success");
      if (success.status === 200) {
        this.forwardAssignIssue = success.body;
      }
      else if (success.status === 204) {
        this.forwardAssignIssue = 0;
      }

    }, error => { })
  }
  countByAssignUsernameAndStatusResolve(username: any, status: string) {
    this.dashboardService.countByAssignUsernameAndStatus(username, status).subscribe(success => {
      console.log("inside success");
      console.log(success);
      if (success.status === 200) {
        this.resolveAssignIssue = success.body;
      }
      else if (success.status === 204) {
        this.resolveAssignIssue = 0;
      }

    }, error => { })
  }
  countByAssignUsernameAndStatusPending(username: any, status: string) {
    this.dashboardService.countByAssignUsernameAndStatus(username, status).subscribe(success => {
      console.log("inside success");
      console.log(success);
      if (success.status === 200) {
        this.pendingAssignIssue = success.body;
      }
      else if (success.status === 204) {
        this.pendingAssignIssue = 0;
      }


    }, error => { })
  }
  countByAssignUsername(username: any) {
    this.dashboardService.countAssignByUsername(username).subscribe(success => {
      console.log("success");
      console.log(success);
      if (success.status === 200) {
        this.totalAssignIssue = success.body;

      }
      else if (success.status === 204) {
        this.totalAssignIssue = 0;
      }

    }, error => {

      console.log("eroor");
    })
  }

  countByUsernameAndStatusRejectIn(username: any, status: any) {
    this.dashboardService.countByUsernameAndStatusIn(username, status).subscribe(success => {
      console.log("inside success count");
      console.log(success);
      if (success.status === 200) {
        this.rejectedIssue = success.body;
      }
      else if (success.status === 204) {
        this.rejectedIssue = 0;
      }

    }, error => { })
  }
  countByUsernameAndStatusForwarded(username: any, status: any) {
    this.dashboardService.countByUsernameAndStatusIn(username, status).subscribe(success => {
      console.log("inside success");
      console.log(success);
      if (success.status === 200) {
        this.forwardedIssue = success.body;
      }
      else if (success.status === 204) {
        this.forwardedIssue = 0;
      }

    }, error => { })
  }
  countByUsernameAndStatusClose(username: any, status: any) {
    this.dashboardService.countByUsernameAndStatusIn(username, status).subscribe(success => {
      console.log("inside success");
      console.log(success);
      if (success.status === 200) {
        this.resolveIssue = success.body;
      }
      else if (success.status === 204) {
        this.resolveIssue = 0;
      }

    }, error => { })
  }

  countByUsernameAndStatusPendingIn(username: any, status: string) {
    this.dashboardService.countByUsernameAndStatusIn(username, status).subscribe(success => {
      console.log("inside success");
      console.log(success);
      if (success.status === 200) {
        this.pendingIssue = success.body;
      }
      else if (success.status === 204) {
        this.pendingIssue = 0;
      }

    }, error => { })

  }

  countByUsername(username: any) {
    this.dashboardService.countByUsername(username).subscribe(success => {
      console.log("success");
      console.log(success);
      if (success.status === 200) {
        this.totalIssue = success.body;
      }
      else if (success.status === 204) {
        this.totalIssue = 0;
      }


    }, error => {

      console.log("eroor");
    })
  }

}
