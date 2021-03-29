import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OicComponent } from './oic.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RequestNotificationComponent } from './request-notification/request-notification.component';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { ViewIncidentComponent } from './view-incident/view-incident.component';
import { ToDoIncidentComponent } from './to-do-incident/to-do-incident.component';
import { TrackIncidentComponent } from './track-incident/track-incident.component';
import { AddIssueComponent } from './add-issue/add-issue.component';

const routes: Routes = [
  {
    path:'', component:OicComponent,canActivate: [AuthGuard],
    
    children: [
      {
                
        path: '',
        canActivateChild: [AuthGuard],
        children: [

         { path: 'home', 
           component: HomeComponent
        },
          
          {
            path:'add-incident',
            component:AddIncidentComponent

          },

          {
            path:'view-incident',
            component:ViewIncidentComponent

          },

          {
            path:'track-incident',
            component:TrackIncidentComponent

          },

          {
            path:'dashboard',
            component:DashboardComponent
          },

          {
            path:'notification',
            component:RequestNotificationComponent
          },

          {
            path:'to-do-incident',
            component:ToDoIncidentComponent
          },
          {
            path: '', redirectTo: 'home', pathMatch: 'full'
          }
        ]
      }     
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OicRoutingModule { }
