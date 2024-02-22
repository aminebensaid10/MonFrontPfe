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
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: UserCard[] = [];
  filteredUsers: UserCard[] = [];
  currentUser = new CurrentUser();

  loadingUsers = true;
  changingAccountStatus = false;
  
  subscriptions = new Subscription();
  imgPrefix = environment.apiUrl + '/avatars/';
  contentHeader: ContentHeader = {
    headerTitle: 'Utilisateurs',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Liste des utilisateurs'
        }
      ]
    }
  };
  constructor(private usersService: UsersService, private sharedModals: SharedModalsService,
    private toastr: ToastrService, private authService: AuthenticationService) {
      this.currentUser = this.authService.currentUserValue;
    }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
      this.loadingUsers = false;
    },
    (error) => {
      this.loadingUsers = false;
    });
  }

  filter($event) {
    this.filteredUsers = this.users;
    if($event != '') {
      this.filteredUsers = this.users.filter(x => (x.email + x.lastname + ' ' + x.firstname).toLowerCase().includes($event.toLowerCase()));
    }
  }


  toggleAccountStatus(user) {
    let modalMessage;
    let modalButton;
    let modalClass;
    if (!user.isActif) {
      modalMessage = 'Voulez-vous réactiver ce compte?';
      modalButton = 'Réactiver';
      modalClass = 'success'
    } else {
      modalMessage = 'Voulez-vous désactiver ce compte?';
      modalButton = 'Désactiver';
      modalClass = "danger"
    }
    this.sharedModals.openConfirmationModal(modalMessage, modalClass ,modalButton).then(data => {
      if (data == 'confirmed') {
    this.changingAccountStatus = true;
    this.usersService.toggleAccountStatus(user._id, !user.isActif).subscribe(data => {
      if(data) {
        if (!user.isActif) {
          this.toastr.success("Compte réactivé", 'Succès');
          user.isActif = true;
        } else {
          this.toastr.success("Compte désactivé", 'Succès');
          user.isActif = false;
          if (user._id == this.authService.currentUserValue.id) {
            this.authService.logout();
          }
        }
        
      }
      this.changingAccountStatus = false;
    },
    (error) => {
      this.toastr.success("Opération échouée", 'Échec');
      this.changingAccountStatus = false;
    });
  }
  });
}

}
