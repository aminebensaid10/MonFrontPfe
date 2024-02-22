import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInscription } from 'app/main/models/users';
import { environment } from 'environments/environment';
import { ChangeEmailRequest } from '../models/change-email-request';
import { UserCard } from '../models/users-list';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  private apiUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }
  

  // get all users on the plateform
  getUsers() {
    return this.http.get<UserCard[]>(environment.apiUrl + '/api/users/getUsers');
  }
  getUserProfile(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }
  // get user data (for user profile)
  getUserData(id) {
    return this.http.get<UserInscription>(environment.apiUrl + '/api/users/getUserData?id=' + id);
  }

  // update all user data except for password and access rights
  updateUserData(user) {
    return this.http.put<boolean>(environment.apiUrl + '/api/users/updateUserData', user);
  }


  changePwd(user_id, oldPassword, newPassword,) {
    return this.http.put<boolean>(environment.apiUrl + '/api/users/changePassword', {user_id, oldPassword, newPassword});
  }


  // save access rights changes
  updateAccessRights(user_id, access_rights) {
    return this.http.put<boolean>(environment.apiUrl + '/api/users/updateAccessRights', {user_id, access_rights});
  }


  // change account status (active/inactive)
  toggleAccountStatus(user_id, new_status) {
    return this.http.put<boolean>(environment.apiUrl + '/api/users/toggleAccountStatus', {user_id, new_status});
  }

  // send a verification code the new email typed by the user
  // returns false if the email is already used
  // return the document _id if the code has been sent
  sendChangeEmailRequest(request: ChangeEmailRequest) {
    return this.http.post(environment.apiUrl + '/api/users/sendChangeEmailRequest', request);
  }

  // takes the document _id and the verification code as params
  // verifes if the verification code is valid or not. and based on that if the verification code is true it updates the email
  updateEmail(id, verification_code) {
    return this.http.put(environment.apiUrl + '/api/users/updateEmail', {id, verification_code});
  }
}








