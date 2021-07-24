import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  contextPath: any;

  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }

  getFileByIncidentNumber(incidentNumber: string) {
    console.log("Inside getting users");
    return this.http.get(this.contextPath + 'upload-file/incident-number/' + incidentNumber, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }


  viewFile(incidentNumber: string, fileName: string, response) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("incidentNumber", incidentNumber)
    .append("fileName", fileName)
   
    let options : any = {
      responseType: 'blob',
      params: httpParams
    }
  
    if (response) {
      options["observe"] = 'response';
    }
  
    return this.http.get(this.contextPath +"/upload-file/downloadFile", options);
  }
  

  attachMoreFileByIncidentNumber(incidentNumber:string,comments:string,uploadFiles: File [] ) {
    let formData = new FormData();
        uploadFiles.forEach(file  => {
        formData.append('files', file);
    });
    formData.append('incidentNumber',incidentNumber);
    formData.append('comments',comments);
    // formData.append('requestInformation', JSON.stringify(requestInformation));

    return this.http.post(this.contextPath + 'incident-master/attach-file/', formData, { observe: 'response' });
  }

  getAllFileTemplateName() {
    console.log("getAllFileTemplateName");
    return this.http.get(this.contextPath + 'template-files', { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  downloadFileTemplate(templateId: string, response) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("templateId", templateId)
     
    let options : any = {
      responseType: 'blob',
      params: httpParams
    }
  
    if (response) {
      options["observe"] = 'response';
    }
  
    return this.http.get(this.contextPath +"/template-files/downloadTemplateFile", options);
  }
  
}
