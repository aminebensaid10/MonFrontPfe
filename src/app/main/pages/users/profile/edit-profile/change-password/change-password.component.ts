import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../services/users-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordTextTypeRetype = false;
  passwordTextTypeNew = false;
  passwordTextTypeOld = false;

  oldPwd = '';
  newPwd = '';
  confirmPwd = '';
  wrongPwd = null;
  submitted = false;

  constructor(private usersService: UsersService, private route: ActivatedRoute,
    private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  togglePasswordTextTypeRetype(){
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }

  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  changePassword(){
    this.submitted = true;
    if ((this.newPwd != this.confirmPwd) || this.newPwd.length < 6) {
      return;
    }
    this.usersService.changePwd(this.route.snapshot.params.id, this.oldPwd, this.newPwd).subscribe(data => {
      if (data) {
        this.toastr.success('Mot de passe modifié', 'Succès');
        this.oldPwd = '';
        this.confirmPwd = '';
        this.newPwd = '';
        this.wrongPwd = false;
        this.submitted = false;
        setTimeout(() => {
          this.wrongPwd = null;
        }, 4000);
      } else {
        this.wrongPwd = true;
      }
    },
    (error) => {
      this.toastr.error('Opération échouée', 'Échec');

    });
  }




}
