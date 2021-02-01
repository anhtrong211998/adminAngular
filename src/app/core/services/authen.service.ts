import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SystemConstants } from '../common/system.constants';
import { LoggedInUser } from '../domain/loggedin.user';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient) { }

  //login
  login(username: string, password: string) {
    //encode username and password
    const body = 'userName=' + encodeURIComponent(username) +
      '&password=' + encodeURIComponent(password) +
      '&grant_type=password';
    const headers = new HttpHeaders();
    //set header
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    let promise = new Promise((resolve, reject) => {
      this._http.post(environment.BASE_API + '/api/oauth/token', body, {headers: headers})
        .subscribe((response: any) => {
          //set value for user have date type is object LoggedInUser
          const user: LoggedInUser = response;
          console.log(user);
          //if have user or user is not null
          if (user && user.access_token) {
            //remove localStirage the first
            localStorage.removeItem(SystemConstants.CURRENT_USER);
            //set localStorage again
            localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
            resolve(true);
          }
          else {
            reject(false);
          }
        }, error => {
          reject(error);
        });
    });
    return promise;
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  //check login or not
  isUserAuthenticated(): boolean {
    const user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    }
    else {
      return false;
    }
  }

  //get value after login
  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUser(userData.access_token,
        userData.username,
        userData.fullName,
        userData.email,
        userData.avatar, userData.roles, userData.permissions);
    }
    else {
      user = null;
    }
    return user;
  }
  //check access
  checkAccess(functionId: string) {
    var user = this.getLoggedInUser();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.permissions);
    var roles: any[] = JSON.parse(user.roles);
    var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanRead == true);
    if (hasPermission != -1 || roles.findIndex(x => x == 'Admin') != -1) {
      return true;
    }
    else {
      return false;
    }
  }
  hasPermission(functionId: string, action: string): boolean {
    var user = this.getLoggedInUser();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.permissions);
    var roles: any[] = JSON.parse(user.roles);
    switch (action) {
      case 'create':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanCreate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == 'Admin') != -1) {
          result = true;
        }
        break;
      case 'update':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanUpdate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == 'Admin') != -1) {
          result = true;
        }
        break;
      case 'delete':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanDelete == true);
        if (hasPermission != -1 || roles.findIndex(x => x == 'Admin') != -1) {
          result = true;
        }
        break;
    }
    return result;
  }
}
