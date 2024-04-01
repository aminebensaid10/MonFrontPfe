import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { CoreMenu } from '@core/types';
import { CurrentUser, UserInscription } from 'app/main/models/users';
import { User } from '../../users/models/user.model';
import { UsersService } from '../../users/services/users-service.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService   {

  public currentUser: Observable<CurrentUser>;

  currentUserSubject: BehaviorSubject<CurrentUser>;
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  users:User

  private menu: CoreMenu[] = [
    {
      id: 'collaborateur',
      title: 'Ma Composition Familiale',
      type: 'collapsible',
      icon: 'users',
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
    },
   
    {
      id: 'family-requests',
      title: 'Composition Familiale',
      type: 'collapsible',
      icon: 'users', 
      children: [
        {
          id: 'pending-requests',
          icon: 'circle',
          title: 'Mes Demandes',
          type: 'item',
          url: 'Gestionnaire/demandes-list'
        },
        {
          id: 'pending-requests',
          icon: 'circle',
          title: 'Liste des membres',
          type: 'item',
          url: 'Gestionnaire/Membres-familles'
        },
        
      ],
    },
    {
      id: 'Situationfamilialedemande',
      title: 'Situation Familiale',
      type: 'collapsible',
      icon: 'heart',
      children: [
        {
          id: 'demandesSituation-list',
          icon: 'circle',
          title: 'Mes demandes',
          type: 'item',
          url: 'Gestionnaire/Demandes-situation-familiale'
        },
        {
          id: 'collaborateur-situation',
          icon: 'circle',
          title: 'Liste des situations',
          type: 'item',
          url: 'users/Collaborateur-situation'
        }
      ],
    },
    {
      id: 'demenagementGestionnaireRH',
      title: 'Déménagement',
      type: 'collapsible',
      icon: 'home', 
      children: [
        {
          id: 'pending-requests',
          icon: 'circle',
          title: 'Mes Demandes',
          type: 'item',
          url: 'Gestionnaire/Demandes-demenagements'
        },
        {
          id: 'pending-requests',
          icon: 'circle',
          title: 'Liste des adresses principale',
          type: 'item',
          url: 'users/Collaborateur-adresse'
        },
        
      ],
    },
    {
      id: 'situationfamililale',
      title: 'Ma Situation Familiale',
      type: 'collapsible',
      icon: 'heart', 
      children: [
        {
          id: 'pending-requests',
          icon: 'circle',
          title: 'Ajouter Situation famililale',
          type: 'item',
          url: 'users/Add-situation'
        },
        {
          id: 'pending-requests',
          icon: 'circle',
          title: 'Ma Situation famililale',
          type: 'item',
          url: 'users/My-situation'
        },
        {
          id: 'pending-requests',
          icon: 'circle',
          title: 'Mes demandes',
          type: 'item',
          url: 'users/my-requests'
        },
        
      ],
      
      
    },
    {
      id: 'demenagement',
      title: 'Mon déménagement',
      type: 'collapsible',
      icon: 'home', 
      children: [
        {
          id: 'pending-requestss',
          icon: 'circle',
          title: 'Ajouter Mon Adresse Principale',
          type: 'item',
          url: 'users/Add-address'
        },
        {
          id: 'pending-requestss',
          icon: 'circle',
          title: 'Mon Adresse Principale',
          type: 'item',
          url: 'users/My-address'
        },
        {
          id: 'pending-requestss',
          icon: 'circle',
          title: 'Mes demandes',
          type: 'item',
          url: 'users/my-requests-moving'
        },
        
      ],
      
      
      
    },
    {
      id: 'modeTransport',
      title: 'Mon mode du transport',
      type: 'collapsible',
      icon: 'users',
      children: [
        {
          id: 'users-list',
          icon: 'circle',
          title: 'Mes demandes',
          type: 'item',
          url: 'users/my-requests-transport-mode'
        },
        {
          id: 'mon-mode-du-transport',
          icon: 'circle',
          title: 'Mon mode du transport',
          type: 'item',
          url: 'users/My-transport-mode'
        },
        {
          id: 'add-mode-transport',
          icon: 'circle',
          title: 'Ajouter mon mode du transport',
          type: 'item',
          url: 'users/mode-of-transport'
        },
      ],
    },
    {
      id: 'mode-of-transport-requests',
      title: 'Mode du transport',
      type: 'collapsible',
      icon: 'users', 
      children: [
        {
          id: 'pending-requests',
          icon: 'circle',
          title: 'Mes Demandes',
          type: 'item',
          url: 'Gestionnaire/demandes-mode-transport'
        },
        {
          id: 'pending-requests',
          icon: 'circle',
          title: 'Liste des collaborateurs avec leurs modes du transport',
          type: 'item',
          url: 'users/Collaborateur-mode-transport'
        },
        
      ],
    },
  ];
  
  constructor(private http: HttpClient, private router: Router,  private usersService: UsersService) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  // getter: currentUserValue
  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

  // test(): void {
  //   const token = localStorage.getItem('token'); 

  //   if (token) {
  //     this.usersService.getUserProfile(token).subscribe(
  //       (users : User) => {
  //         this.users = users;
  //         this.users.role
  //         console.log('Profil utilisateur récupéré avec succès. Role:', this.users.role);
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la récupération du rol utilisateur :', error);
  //       }
  //     );
  //   } else {
  //     console.error('Token d\'ee non disponible.');
  //   }
  // }
  public get currentMenu(): CoreMenu[] {
    const token = localStorage.getItem('token');
    
    if (token) {
      this.usersService.getUserProfile(token).subscribe(
        (users: User) => {
          this.users = users;
          const userRole = this.users ? this.users.role : null;
          console.log('Profil utilisateur récupéré avec succès. Role:', userRole);
    
          this.menu.forEach(x => {
            if ((x.id === 'collaborateur' && userRole === 'COLLABORATEUR')  || (x.id === 'situationfamililale'&& userRole === 'COLLABORATEUR' )|| (x.id === 'demenagement'&& userRole === 'COLLABORATEUR' )|| (x.id === 'situationfamililale'&& userRole === 'COLLABORATEUR' )|| (x.id === 'modeTransport'&& userRole === 'COLLABORATEUR' )){
              x.hidden = false;
              x.children.forEach(child => (child.hidden = false));
            } else if ((x.id === 'family-requests' && userRole === 'GESTIONNAIRERH') || (x.id === 'Situationfamilialedemande'&& userRole === 'GESTIONNAIRERH' )|| (x.id === 'demenagementGestionnaireRH'&& userRole === 'GESTIONNAIRERH' )) {
              x.hidden = false;
              x.children.forEach(child => (child.hidden = false));
            }
            else if ((x.id === 'mode-of-transport-requests' && userRole === 'GESTIONNAIREPAIE')) {
              x.hidden = false;
              x.children.forEach(child => (child.hidden = false));}
             else {
              x.hidden = true;
            }
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération du rôle utilisateur :', error);
        }
      );
    } else {
      console.error('Token non disponible.');
    }
  
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
