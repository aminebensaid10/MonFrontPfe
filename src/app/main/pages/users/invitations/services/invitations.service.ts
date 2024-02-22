import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInscription } from 'app/main/models/users';
import { environment } from 'environments/environment';
import { catchError, map } from 'rxjs/operators';
import { InvitationCard } from '../../models/invitations-list-model';
import { Observable, throwError } from 'rxjs';
import { error } from 'console';
import { of } from 'rxjs';


@Injectable()
export class InvitationsService {

  private apiUrl = 'http://localhost:8080/api/v1/collaborateur/membres';
  constructor(private http: HttpClient) { }
  creerDemandeCompositionFamiliale(demande: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
  
    return this.http.post<any>('http://localhost:8080/api/v1/collaborateur/creer-demande-composition-familiale', demande, { headers, observe: 'response' });
  }
  
  
  
  
  


 
  

  getMembres(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  //
  resendInvitation(user: InvitationCard) {
    return this.http.post(environment.apiUrl + '/api/invitations/resendInvitation', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      _id: user._id
    });
  }

  
  // deleteInvitation(id) {
  //   return this.http.delete<boolean>(environment.apiUrl + '/api/invitations/cancelInvitation?id=' + id);
  // }
  
  // send user invitation
  // inviteUser(user) {
  //   return this.http.post<UserInscription>(environment.apiUrl + '/api/invitations/inviteUser', user);
  // }
}
