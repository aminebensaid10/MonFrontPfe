import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInscription } from 'app/main/models/users';
import { environment } from 'environments/environment';
import { catchError, map } from 'rxjs/operators';
import { InvitationCard } from '../../models/invitations-list-model';
import { Observable, throwError } from 'rxjs';
import { error } from 'console';
import { of } from 'rxjs';
import { CoreMenu } from '@core/types';


@Injectable()
export class InvitationsService {

  private apiUrl = 'http://localhost:8080/api/v1/collaborateur/membres';
  private apiURL = 'http://localhost:8080/api/v1/collaborateur/situation-familiale';

  constructor(private http: HttpClient) { }
  private menu: CoreMenu[] = [
    {
      id: 'users',
      title: 'Ma Composition Familiale',
      type: 'collapsible',
      icon: 'users',
      role: ["GESTIONNAIRERH"],
      children: [
        {
          id: 'users-list',
          icon: 'circle',
          title: 'Mes demandes',
          type: 'item',
          url: 'users/users-list'
        },
        {
          id: 'invitation-user',
          icon: 'circle',
          title: 'Ma famille',
          type: 'item',
          url: 'users/invitations/invitations-list'
        },
        {
          id: 'add-user',
          icon: 'circle',
          title: 'Ajouter un membre',
          type: 'item',
          url: 'users/invitations/invite-user'
        },
      ],
    }
  ]
  
  creerDemandeCompositionFamiliale(demande: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
  
    const formData = new FormData();
  
    for (const key in demande) {
      if (demande.hasOwnProperty(key)) {
        formData.append(key, demande[key]);
      }
    }
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
  
    return this.http.post<any>('http://localhost:8080/api/v1/collaborateur/creer-demande-composition-familiale', formData, { headers, observe: 'response' });
  }
  
  
  
  creerDemandeSituationFamiliale(demande: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    for (const key in demande) {
      if (demande.hasOwnProperty(key)) {
        formData.append(key, demande[key]);
      }
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post<any>(
      'http://localhost:8080/api/v1/collaborateur/creer-demande-situation-familiale',
      formData,
      { headers, observe: 'response' }
    );
  }
  creerDemandeModificationSituationFamiliale(demande: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    for (const key in demande) {
      if (demande.hasOwnProperty(key)) {
        formData.append(key, demande[key]);
      }
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post<any>(
      'http://localhost:8080/api/v1/collaborateur/creer-demande-modification-situation-familiale',
      formData,
      { headers, observe: 'response' }
    );
  }

  creerDemandeSuppressionSituationFamiliale(): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    return this.http.post<any>(
      'http://localhost:8080/api/v1/collaborateur/creer-demande-suppression-situation-familiale',
      {}, 
      { headers, observe: 'response' }
    );
  }
  

  getMembres(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
  getMembreParId(membreId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get<any>(`${this.apiUrl}/${membreId}`, { headers });
  }
 
  getSituationFamiliale(): Observable<string> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get(this.apiURL, { headers, responseType: 'text' });
  }
  modifierMembreEtCreerDemandeModification(membreId: number, demande: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
  
    const apiUrl = `http://localhost:8080/api/v1/collaborateur/modifier-membre-et-creer-demande-modification/${membreId}`;
  
    return this.http.post<any>(apiUrl, demande, { headers, observe: 'response' }).pipe(
      map(response => {
        // Personnalisez la désérialisation ici si nécessaire
        return response;
      })
    );
  }
  creerDemandeSuppression(membreId: number): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    const apiUrl = `http://localhost:8080/api/v1/collaborateur/creer-demande-suppression/${membreId}`;
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
  
    return this.http.post<any>(apiUrl, null, { headers, observe: 'response' }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
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
