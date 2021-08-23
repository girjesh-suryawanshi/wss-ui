import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  contextPath: any;
  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }


  getAllProject() {
    console.log("Inside Location Code and Name Service");
    return this.http.get(this.contextPath + '/users', { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }



  getAllUsers(locationCode: string, role: any) {
    console.log("Inside getting users");
    return this.http.get(this.contextPath + '/users-detail/location-code/' + locationCode + '/role/' + role, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }


  deleteById(id) {
    return this.http.delete(this.contextPath + "project-user-mapping/id/" + id, { observe: 'response' }).pipe(map((response: HttpResponse<any>) => {
      return response;
    }));
  }

  public updatePassword(user, response: boolean) {
    let options = null;
    if (response) {
      options = { observe: 'response' };
      return this.http.put(this.contextPath + '/users', user, options);
    } else {
      return this.http.put(this.contextPath + '/users', user);
    }
  }

  getUserByUsername(username: string) {
    return this.http.get(this.contextPath + 'users/user-name/' + username , { observe: 'response' }).pipe(map(
    (response: HttpResponse<any>) => {
      return response;
    }));
    
}


  getByLocationCode(locationCode: string) {
    return this.http.get(this.contextPath + 'location-master/location-code/' + locationCode , { observe: 'response' }).pipe(map(
    (response: HttpResponse<any>) => {
      return response;
    }));  
  }
  
  updateUserDetail(userDetail: any ) {
   return this.http.put(this.contextPath + 'users-detail',userDetail, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
  }
  
  updateUserMobileNumber(userDetail: any ) {
    return this.http.put(this.contextPath + 'users-detail/update-mobile-number',userDetail, { observe: 'response' }).pipe(
       map((response: HttpResponse<any>) => {
         return response;
       }));
   }
  
   resetUserByUsername(username: string) {
    return this.http.put(this.contextPath + 'users/reset-user/user-name/' + username , { observe: 'response' }).pipe(map(
    (response: HttpResponse<any>) => {
      return response;
    }));
    
  }

}
