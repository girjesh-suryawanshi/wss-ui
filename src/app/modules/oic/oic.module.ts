import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OicRoutingModule } from './oic-routing.module';
import { OicComponent } from './oic.component';
import { NavbarComponent } from '../../components/navbar/nav-bar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestNotificationComponent } from './request-notification/request-notification.component';
import {SessionTimerComponent} from 'src/app/components/timer/session-timer/session-timer.component';
import {LoginModalModule} from 'src/app/modals/login-modal/login-modal.module';
import {DataTablesModule} from 'angular-datatables';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { ViewIncidentComponent } from './view-incident/view-incident.component';
import { TrackIncidentComponent } from './track-incident/track-incident.component';
import { ToDoIncidentComponent } from './to-do-incident/to-do-incident.component';
import { SearchIncidentComponent } from './search-incident/search-incident.component';


@NgModule({
  declarations: [OicComponent,NavbarComponent,SessionTimerComponent,FooterComponent, HomeComponent,DashboardComponent, RequestNotificationComponent, AddIncidentComponent, ViewIncidentComponent, TrackIncidentComponent, ToDoIncidentComponent, SearchIncidentComponent],
  imports: [
    CommonModule,
    OicRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginModalModule,
    DataTablesModule
  ]
})
export class OicModule { }
