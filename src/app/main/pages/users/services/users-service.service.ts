import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInscription } from 'app/main/models/users';
import { environment } from 'environments/environment';
import { ChangeEmailRequest } from '../models/change-email-request';
import { UserCard } from '../models/users-list';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private apiURL = 'http://localhost:8080/api/v1/collaborateur';

  constructor(private http: HttpClient) { }
  
  getDemandes(): Observable<any[]> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get<any[]>(`${this.apiURL}/demandes`, { headers});
  }
  getDemandesSituation(): Observable<any[]> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get<any[]>(`${this.apiURL}/demandes-situation`, { headers});
  }
  getDemandesDemenagement(): Observable<any[]> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get<any[]>(`${this.apiURL}/demandes-demenagement`, { headers});
  }
  getDemandesModeTransport(): Observable<any[]> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get<any[]>(`${this.apiURL}/demandes-mode-transport`, { headers});
  }
  getcollaborateur(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get<any[]>('http://localhost:8080/api/v1/gestionnaireRH/situation-familiale', { headers });
  }
  getmodetransport(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get<any[]>('http://localhost:8080/api/v1/collaborateur/mode-transport', { headers });
  }
  getUsersByFamilySituation(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<any>('http://localhost:8080/api/v1/gestionnaireRH/family-situation', { headers: headers });
  }
  getUsersByModeTransport(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<any>('http://localhost:8080/api/v1/gestionnairePAIE/countByTransportMode', { headers: headers });
  }
  gePecrentageModeTransport(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<any>('http://localhost:8080/api/v1/gestionnairePAIE/percentageModeTransport', { headers: headers });
  }
  gePecrentageSituationFamiliale(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<any>('http://localhost:8080/api/v1/gestionnaireRH/percentageSituationFamiliale', { headers: headers });
  }
  getFamilyMembersStatistics(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>('http://localhost:8080/api/v1/gestionnaireRH/family-members-statistics', { headers: headers });
  }
  getRequestsFamily(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>('http://localhost:8080/api/v1/gestionnaireRH/countByEtat', { headers: headers });
  }
  getRequestsSituation(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>('http://localhost:8080/api/v1/gestionnaireRH/countRequestsSituationByEtat', { headers: headers });
  }
  getRequestsDemenagement(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>('http://localhost:8080/api/v1/gestionnaireRH/countRequestsDemenagementByEtat', { headers: headers });
  }
  
  // get all users on the plateform
  // getUsers() {
  //   return this.http.get<UserCard[]>(environment.apiUrl + '/api/users/getUsers');
  // }
  getUserProfile(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }
  updateProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le jeton d'authentification depuis le stockage local
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token // Ajouter le jeton d'authentification à l'en-tête de la requête
    });
    return this.http.put<any>(`${this.apiUrl}/update`, profileData, { headers });
     
  }
  changePassword(passwordData: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post<any>(`${this.apiUrl}/change-password`, passwordData, { headers, observe: 'response'  });
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








