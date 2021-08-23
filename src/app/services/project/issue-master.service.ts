import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';
import { IssueMaster } from 'src/app/models/issueMaster.model';

@Injectable({
  providedIn: 'root'
})
export class IssueMasterService {

  contextPath: any;

  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }

  // reopenIssueByTokenNumber(tokenNumber: string,status:any) {
  //     return this.http.get(this.contextPath + '/issue-master/re-open/token-number/' + tokenNumber +'/status/'+status, { observe: 'response' }).pipe(map(
  //     (response: HttpResponse<any>) => {
  //       return response;
  //     }));
  // }

  insertIssueMaster(issueMaster: IssueMaster, myFiles: File [] ) {
    let formData = new FormData();
        myFiles.forEach(file  => {
        formData.append('files', file);
    });

    formData.append('issueMaster', JSON.stringify(issueMaster));

    return this.http.post(this.contextPath + 'issue-master', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
  }


  getAllAssignedProblem(username: string, locationCode: any) {
    console.log("Inside getting users");
    return this.http.get(this.contextPath + '/issue-master/user-name/' + username + '/location-code/' + locationCode, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  getFileByTokenNumber(tokenNumber: string) {
    console.log("Inside getting users");
    return this.http.get(this.contextPath + '/file/token-number/' + tokenNumber, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  getResolveIssueFileByTokenNumber(tokenNumber: string) {
    console.log("Inside getResolveIssueFileByTokenNumber");
    return this.http.get(this.contextPath + '/resolve-issue-file/token-number/' + tokenNumber, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  getReopenIssueFileByTokenNumber(tokenNumber: string) {
    console.log("Inside getResolveIssueFileByTokenNumber");
    return this.http.get(this.contextPath + '/reopen-issue-file/token-number/' + tokenNumber, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }



  viewFileByTokenNumberAndFileName(tokenNumber: string,fileName:string) {
    let formData = new FormData();
    formData.append('tokenNumber',tokenNumber);
    formData.append('fileName',fileName);
    return this.http.post(this.contextPath + 'file/downloadFile', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
 }

 viewFile(tokenNumber: string, fileName: string, response) {
  let httpParams = new HttpParams();
  httpParams = httpParams.append("tokenNumber", tokenNumber)
  .append("fileName", fileName)
 
  let options : any = {
    responseType: 'blob',
    params: httpParams
  }

  if (response) {
    options["observe"] = 'response';
  }

  return this.http.get(this.contextPath +"/file/downloadFile", options);
}

downloadFileByTokenNumberAndFileName(tokenNumber: string, fileName: string, response) {
  let httpParams = new HttpParams();
  httpParams = httpParams.append("tokenNumber", tokenNumber)
  .append("fileName", fileName) 
  let options : any = {
    responseType: 'blob',
    params: httpParams
  }
  if (response) {
    options["observe"] = 'response';
  }
  return this.http.get(this.contextPath +"/resolve-issue-file/downloadFile", options);
}

downloadReopenIssueFileByTokenNumberAndFileName(tokenNumber: string, fileName: string, response) {
  let httpParams = new HttpParams();
  httpParams = httpParams.append("tokenNumber", tokenNumber)
  .append("fileName", fileName) 
  let options : any = {
    responseType: 'blob',
    params: httpParams
  }
  if (response) {
    options["observe"] = 'response';
  }
  return this.http.get(this.contextPath +"/reopen-issue-file/downloadFile", options);
}

reopenIssueByTokenNumber(tokenNumber:string,status:string,comments:string,uploadFiles: File [] ) {
  let formData = new FormData();
  if(uploadFiles && uploadFiles.length>0){
  
      uploadFiles.forEach(file  => {
      formData.append('files', file);
  });
}
  formData.append('tokenNumber',tokenNumber);
  formData.append('status',status);
  formData.append('comments',comments);
  return this.http.post(this.contextPath + '/issue-master/reopen/', formData, { observe: 'response' }).pipe(
    map((response: HttpResponse<any>) => {
      return response;
    }));
}

getIncidentMasterByIncidentNumber(incidentNumber: string) {
  return this.http.get(this.contextPath + 'incident-master/incident-number/' + incidentNumber , { observe: 'response' }).pipe(map(
  (response: HttpResponse<any>) => {
    return response;
  }));  
}

}




