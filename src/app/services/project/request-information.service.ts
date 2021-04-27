import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';

@Injectable({
  providedIn: 'root'
})
export class RequestInformationService {

  getRequestInformationReplyByTokenNumberAndIsReplyTrue(incidentNumber:any,isReply:boolean) {
    return this.http.get(this.contextPath + '/request-information/order-by-desc/incident-number/' + incidentNumber +'/is-reply/'+isReply, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }


  getFileByTokenNumber(incidentNumber:any) {
    return this.http.get(this.contextPath + '/request-information-file/incident-number/' + incidentNumber, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  contextPath: any;
  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }

  requestInformationToOrigin(requestInformation: any) {

    return this.http.post(this.contextPath + 'request-information', requestInformation, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }))
  }

  getRequestInformation(username: string) {
    return this.http.get(this.contextPath + 'request-information/user-name/' + username, { observe: 'response' }).pipe(map(
     (response: HttpResponse<any>) => {
       return response;
     }));
 }

 getRequestInformationByUsernameAndIsReply(username: string,isReply:boolean) {
  return this.http.get(this.contextPath + 'request-information/user-name/' + username +'/is-reply/'+isReply, { observe: 'response' }).pipe(map(
   (response: HttpResponse<any>) => {
     return response;
   }));
}

getDistinctRequestInformationByUsernameAndIsReply(username: string,isReply:boolean) {
  return this.http.get(this.contextPath + 'request-information/distinct-request-info/user-name/' + username +'/is-reply/'+isReply, { observe: 'response' }).pipe(map(
   (response: HttpResponse<any>) => {
     return response;
   }));
}

 getByRequestUsername(requestedUsername: string) {
  return this.http.get(this.contextPath + '/request-information/requested-username/' + requestedUsername, { observe: 'response' }).pipe(map(
    (response: HttpResponse<any>) => {
      return response;
    }));
}

getByRequestedUsernameAndIsReply(requestedUsername: string,isReply : boolean) {
  return this.http.get(this.contextPath + '/request-information/distinct-response-information/requested-username/' + requestedUsername +'/is-reply/'+ isReply, { observe: 'response' }).pipe(map(
    (response: HttpResponse<any>) => {
      return response;
    }));
}

getByUsernameAndTokenNumber(username:string,tokenNumber: string) {
  return this.http.get(this.contextPath + '/request-information/user-name/' + username +'/token-number/'+ tokenNumber, { observe: 'response' }).pipe(map(
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

  return this.http.get(this.contextPath +"/request-information-file/downloadFile", options);
}

}
