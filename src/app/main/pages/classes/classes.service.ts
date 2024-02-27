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
  rejectRequest(demandeId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });
    
    const url = `${this.apiUrl}/rejeter-demande/${demandeId}`;
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
  
}
