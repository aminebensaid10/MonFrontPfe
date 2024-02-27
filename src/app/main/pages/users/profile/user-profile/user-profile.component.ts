import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInscription, CurrentUser } from 'app/main/models/users';
import { AuthenticationService } from 'app/main/pages/authentication/services/authentication.service';
import { SharedModalsService } from 'app/shared/services/shared-modals.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users-service.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  user = new UserInscription();
  users : User ;

  isMyProfile = false;
  currentUser = new CurrentUser();

  // bool interface mode edit/view
  editMode = false;
  loadingData = true;
  savingChanges = false;
  changingAccountStatus = false;
  userProfile: any;

  // get profile photo base url intialization
  imgPrefix = environment.apiUrl + '/avatars/';
  
  constructor(private usersService: UsersService, private route: ActivatedRoute,
    private sharedModals: SharedModalsService, private toastr: ToastrService, private authService: AuthenticationService) {
      this.currentUser = authService.currentUserValue;
      this.user._id = this.route.snapshot.params.id;
      this.isMyProfile = this.currentUser.id == this.user._id;
  }

  ngOnInit(): void {
    const token = this.authService.getToken();

    if (token) {
      this.usersService.getUserProfile(token).subscribe(
        (users : User) => {
          this.users = users;
          console.log('Profil utilisateur récupéré avec succès :', this.users);
        },
        (error) => {
          console.error('Erreur lors de la récupération du profil utilisateur :', error);
        }
      );
    } else {
      console.error('Token d\'authentification non disponible.');
    }
  }

  // get user details
  getUserData() {
    this.usersService.getUserData(this.user._id).subscribe(data => {
      this.user = data;
    });
  }

  // save access rights chages
  updateAccessRights() {
    this.savingChanges = true;
    this.usersService.updateAccessRights(this.user._id, this.user.access_rights).subscribe(data => {
      if (data) {
        this.editMode = false;
        this.toastr.success('Droits d\'accès enregistrés', 'Succès');
      }
      this.savingChanges = false;
    },
    (error) => {
      this.toastr.error('Opération échouée', 'Échec');
      this.savingChanges = false;
    });
  }

  toggleAccountStatus(new_status) {
    let modalMessage;
    let modalButton;
    let modalClass;
    if (new_status) {
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
    this.usersService.toggleAccountStatus(this.user._id, new_status).subscribe(data => {
      if(data) {
        if (new_status) {
          this.toastr.success("Compte réactivé", 'Succès');
          this.user.isActif = true;
        } else {
          this.toastr.success("Compte désactivé", 'Succès');
          this.user.isActif = false;
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
