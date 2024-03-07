import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { CurrentUser } from 'app/main/models/users';
import { SharedModalsService } from 'app/shared/services/shared-modals.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { UserCard } from '../models/users-list';
import { UsersService } from '../services/users-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './demandes-list.component.html',
  styleUrls: ['./demandes-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: UserCard[] = [];
  filteredDemandes: any[] = [];
  currentUser = new CurrentUser();
  demandesInitiales: any[] = [];

  demandes: any[] = [];
  private userProfile: any;
  searchQuery: string = '';



  loadingUsers = true;
  changingAccountStatus = false;
  
  subscriptions = new Subscription();
  imgPrefix = environment.apiUrl + '/avatars/';
  contentHeader: ContentHeader = {
    headerTitle: 'Composition Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Mes Demandes'
        }
      ]
    }
  };
  constructor(private usersService: UsersService, private sharedModals: SharedModalsService,
    private toastr: ToastrService, private authService: AuthenticationService) {
      this.currentUser = this.authService.currentUserValue;
    }

  ngOnInit(): void {
    this.loadDemandes();

  }

  // getUsers() {
  //   this.usersService.getUsers().subscribe(data => {
  //     this.users = data;
  //     this.filteredUsers = data;
  //     this.loadingUsers = false;
  //   },
  //   (error) => {
  //     this.loadingUsers = false;
  //   });
  // }

  filter($event: string): void {
  
    if ($event !== '') {
      this.demandes = this.demandes.filter(demande =>
        (demande.membreFamille.nomMembre + ' ' + demande.membreFamille.prenomMembre + ' ' + demande.typeDemande + ' ' + demande.etat)
          .toLowerCase().includes($event.toLowerCase())
      );
    }
  }
  


//   toggleAccountStatus(user) {
//     let modalMessage;
//     let modalButton;
//     let modalClass;
//     if (!user.isActif) {
//       modalMessage = 'Voulez-vous réactiver ce compte?';
//       modalButton = 'Réactiver';
//       modalClass = 'success'
//     } else {
//       modalMessage = 'Voulez-vous désactiver ce compte?';
//       modalButton = 'Désactiver';
//       modalClass = "danger"
//     }
//     this.sharedModals.openConfirmationModal(modalMessage, modalClass ,modalButton).then(data => {
//       if (data == 'confirmed') {
//     this.changingAccountStatus = true;
//     this.usersService.toggleAccountStatus(user._id, !user.isActif).subscribe(data => {
//       if(data) {
//         if (!user.isActif) {
//           this.toastr.success("Compte réactivé", 'Succès');
//           user.isActif = true;
//         } else {
//           this.toastr.success("Compte désactivé", 'Succès');
//           user.isActif = false;
//           if (user._id == this.authService.currentUserValue.id) {
//             this.authService.logout();
//           }
//         }
        
//       }
//       this.changingAccountStatus = false;
//     },
//     (error) => {
//       this.toastr.success("Opération échouée", 'Échec');
//       this.changingAccountStatus = false;
//     });
//   }
//   });
// }
loadDemandes(): void {
  this.usersService.getDemandes().subscribe(
    (data: any[]) => {
      this.demandes = data;

    },
    error => {
      console.error('erreur:', error);
    }
  );
}

}
