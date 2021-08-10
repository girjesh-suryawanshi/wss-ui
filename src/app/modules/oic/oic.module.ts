import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OicRoutingModule } from './oic-routing.module';
import { OicComponent } from './oic.component';
import { NavbarComponent } from '../../components/navbar/nav-bar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewIssueComponent } from './view-issue/view-issue.component';
import { TrackIssueComponent } from './track-issue/track-issue.component';
import { RequestNotificationComponent } from './request-notification/request-notification.component';
import {SessionTimerComponent} from 'src/app/components/timer/session-timer/session-timer.component';
import {LoginModalModule} from 'src/app/modals/login-modal/login-modal.module';
import {ToDoIssueComponent } from './to-do-issue/to-do-issue.component';
import {DataTablesModule} from 'angular-datatables';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { ViewIncidentComponent } from './view-incident/view-incident.component';
import { TrackIncidentComponent } from './track-incident/track-incident.component';
import { ToDoIncidentComponent } from './to-do-incident/to-do-incident.component';


@NgModule({
  declarations: [OicComponent,NavbarComponent,SessionTimerComponent,FooterComponent, AddIssueComponent, HomeComponent,DashboardComponent, ViewIssueComponent, TrackIssueComponent, RequestNotificationComponent, ToDoIssueComponent, AddIncidentComponent, ViewIncidentComponent, TrackIncidentComponent, ToDoIncidentComponent],
  imports: [
    CommonModule,
    OicRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModalModule,
    DataTablesModule
  ]
})
export class OicModule { }
