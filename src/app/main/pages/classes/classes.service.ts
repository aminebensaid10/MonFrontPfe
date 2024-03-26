import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private apiUrl = 'http://localhost:8080/api/v1/gestionnaireRH';


  constructor(private http: HttpClient) {
   }
   getdemandes(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    return this.http.get<any>('http://localhost:8080/api/v1/gestionnaireRH/demandes-groupes', { headers })
      .pipe(map(response => Object.values(response)));
  }
  validateRequest(demandeId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    const url = `${this.apiUrl}/valider-demande/${demandeId}`;
    return this.http.post(url, {}, { headers });
  }
  validateRequestSituation(demandesituationfamiliale_id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    const url = `${this.apiUrl}/valider-demande-situation/${demandesituationfamiliale_id}`;
    return this.http.post(url, {}, { headers });
  }
  validateRequestDemenagement(demandeDemenagementId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    const url = `${this.apiUrl}/valider-demande-demenagement/${demandeDemenagementId}`;
    return this.http.post(url, {}, { headers });
  }
  rejectRequest(demandeId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    const url = `${this.apiUrl}/rejeter-demande/${demandeId}`;
    return this.http.post(url, {}, { headers });
  }
  rejectRequestsituation(demandesituationfamiliale_id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    const url = `${this.apiUrl}/rejeter-demande-situation/${demandesituationfamiliale_id}`;
    return this.http.post(url, {}, { headers });
  }
  rejectRequestdemenagement(demandeDemenagementId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    const url = `${this.apiUrl}/rejeter-demande-demenagement/${demandeDemenagementId}`;
    return this.http.post(url, {}, { headers });
  }
  getDemandeById(demandeId: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    const url = `${this.apiUrl}/demandes/${demandeId}`;
    return this.http.get(url, { headers });
  }
  getDemandeSituationById(demandesituationfamiliale_id: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    const url = `${this.apiUrl}/demandes-situation/${demandesituationfamiliale_id}`;
    return this.http.get(url, { headers });
  }
  getDemandeDemenagementById(demandeDemenagementId: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    const url = `${this.apiUrl}/demandes-demenagement/${demandeDemenagementId}`;
    return this.http.get(url, { headers });
  }
  getDemandesSituationFamiliale(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    const url = 'http://localhost:8080/api/v1/gestionnaireRH/demandes-situation-familiale';

    return this.http.get<any[]>(url, { headers });
  }
  getDemandesDemenagement(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    const url = 'http://localhost:8080/api/v1/gestionnaireRH/demandes-demenagement';

    return this.http.get<any[]>(url, { headers });
  }
  getAllMembres(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    const url = 'http://localhost:8080/api/v1/gestionnaireRH/membres-tous';

    return this.http.get<any[]>(url, { headers });
  }
}
