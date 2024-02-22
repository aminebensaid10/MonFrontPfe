import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInscription, CurrentUser } from 'app/main/models/users';
import { AuthenticationService } from 'app/main/pages/authentication/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../services/users-service.service';

@Component({
  selector: 'app-edit-access-rights',
  templateUrl: './edit-access-rights.component.html',
  styleUrls: ['./edit-access-rights.component.scss']
})
export class EditAccessRightsComponent implements OnInit {

  user = new UserInscription();

  currentUser = new CurrentUser();
  savingChanges = false;
  canEdit = false;

  constructor(private usersService: UsersService, private authService: AuthenticationService,
    private toastr: ToastrService, private route: ActivatedRoute) {
    this.user._id = this.route.snapshot.params.id;
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser.access_rights.users == 'write') {
      this.canEdit = true;
    }
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.usersService.getUserData(this.user._id).subscribe(data => {
      this.user = data;
    });
  }


  updateAccessRights() {
    this.usersService.updateAccessRights(this.user._id, this.user.access_rights).subscribe(data => {
      if (data) {
        this.toastr.success('Droits d\'accès modifiés', 'Succès');
      }
    },
    (error) => {
      this.toastr.error('Opération échouée', 'Échec');
    });
  }

}
