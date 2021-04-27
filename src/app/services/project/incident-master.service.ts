import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';
import { IncidentMaster } from 'src/app/models/incidentMaster.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentMasterService {

  contextPath: any;

  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }

  insertIncidentMaster(incidentMaster: IncidentMaster, myFiles: File [] ) {
    let formData = new FormData();
        myFiles.forEach(file  => {
        formData.append('files', file);
    });

    formData.append('incidentMaster', JSON.stringify(incidentMaster));

    return this.http.post(this.contextPath + 'incident-master', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
  }

  getIncidentByUsernameAndLocationCode(username: string, locationCode: any) {
      return this.http.get(this.contextPath + '/incident-master/user-name/' + username + '/location-code/' + locationCode, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  approveIncidentByIncidentNumber(incidentNumber:string,comments:string) {
    let formData = new FormData();
    
    formData.append('incidentNumber',incidentNumber);
    formData.append('comments',comments);
    // formData.append('requestInformation', JSON.stringify(requestInformation));

    return this.http.post(this.contextPath + 'incident-assign-master/accept', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
  }

  rejectIncidentByIncidentNumber(incidentNumber:string,comments:string) {
    let formData = new FormData();
    
    formData.append('incidentNumber',incidentNumber);
    formData.append('comments',comments);
    // formData.append('requestInformation', JSON.stringify(requestInformation));

    return this.http.post(this.contextPath + 'incident-assign-master/reject', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
  }

}
