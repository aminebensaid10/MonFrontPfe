import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { CoreMenu } from '@core/types';
import { CurrentUser, UserInscription } from 'app/main/models/users';
import { User } from '../../users/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  public currentUser: Observable<CurrentUser>;

  currentUserSubject: BehaviorSubject<CurrentUser>;
  private apiUrl = 'http://localhost:8080/api/v1/auth';

  private menu: CoreMenu[] = [
    {
      id: 'users',
      title: 'Ma Composition Familiale',
      type: 'collapsible',
      icon: 'users',
      children: [
        // {
        //   id: 'users-list',
        //   icon: 'circle',
        //   title: 'Liste des utilisateurs',
        //   type: 'item',
        //   url: 'users/users-list'
        // },
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
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }


  public get currentMenu(): CoreMenu[] {
    this.menu.forEach(x => {
      // if (this.currentUserValue.access_rights[x.id] != 'none') {
      //   x.hidden = false;
      // } else {
      //   x.hidden = true;
      // }
      x.hidden = false;
    });
    return this.menu;
  }
  isTokenPresent(): boolean {
    const token = localStorage.getItem('token'); 
    return !!token; 
  }


  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/signin`, { email, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('token', JSON.stringify(user));
            // notify
            // this.currentUserSubject.next(user);
            return user;
          }

          return user;
        })
      );
  }

  // get pre-inscription to prefill the register form
  getPreInscription(id) {
    // return this.http.get<UserInscription>(environment.apiUrl + '/api/auth/getPreInscription?id=' + id).pipe(
    //   map(data => {
    //     if (data) {
    //       data.password = '';
    //       return data;
    //     }
    //     return null;
    //   })
    // );
    return null;
  }

  signUp(user: FormData): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:8080/api/v1/auth/signup', user);
  }
  // loginn(utilisateur: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/signin`, utilisateur);
  // }
  // loginnn(credentials: { email: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/signin`, credentials);
  // }
  
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // upload profile picture
  uploadImage(file: File, user_id) {
    const formData: FormData = new FormData();
    formData.append('userToAdd', JSON.stringify(user_id));
    formData.append('file', file);
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/uploadProfileImage`, formData);
    return this.http.request(req);
  }

  logout() {
    // Récupère la valeur du jeton stocké dans le localStorage
    const tokenValue = localStorage.getItem('token');
  
    if (tokenValue) {
      console.log('Valeur du token avant la suppression :', tokenValue);
  
      localStorage.removeItem('token');
  
      console.log('Le token a été supprimé.');
      this.router.navigate(['/auth/login']);  // Assurez-vous que '/login' correspond à votre route de connexion

    } else {
      console.log('Aucun token trouvé dans le localStorage.');
    }
  
    // Notify ou effectuez d'autres actions de nettoyage si nécessaire
    // Par exemple, vous pourriez vouloir vider le sujet de l'utilisateur actuel s'il est utilisé
    // this.currentUserSubject.next(null);
  }
  
  // logout() {
  //   // Vérifie si la clé "token" existe avant de la supprimer
  //   if (localStorage.getItem('token')) {
  //     // Supprime le jeton de l'utilisateur stocké dans le localStorage
  //     localStorage.removeItem('token');
  //   }
  //   this.router.navigate(["/auth/login"]);
  //   // notify
  //   this.currentUserSubject.next(null);
  // }
}
