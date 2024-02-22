import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeEmailRequest } from '../../../models/change-email-request';
import { UsersService } from '../../../services/users-service.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {

  changeEmailForm: FormGroup;

  sendEmailSubmit = false;
  updateSubmit = false;
  requestId = null;
  error = null;
  success = null;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService,
    private route: ActivatedRoute) {
     }

  ngOnInit(): void {
    this.changeEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      verification_code: ['']
    });
  }

  get f() {
    return this.changeEmailForm.controls;
  }

  onSubmit() {
    this.sendEmailSubmit = true;
    console.log(this.changeEmailForm.get('verification_code').value);
    console.log(this.changeEmailForm.get('email').value);

    if (this.changeEmailForm.invalid) {
      console.log(this.f.verification_code.errors);
      console.log(this.f.email.errors);

      return;
    }

    console.log("passed");


    const request = new ChangeEmailRequest();
    request.new_email = this.changeEmailForm.get('email').value;
    request.user_id = this.route.snapshot.params.id;

    this.usersService.sendChangeEmailRequest(request).subscribe(data => {
      if (data) {
        this.requestId = data;
        this.success = 'Email contenant un code de vérification a été envoyé.';
        this.changeEmailForm.get('verification_code').setValidators(Validators.required);
        this.sendEmailSubmit = false;
        setTimeout(() => {
          this.success = null;
        }, 5000);

      } else {
        this.error = 'Email déja utilisée!';
      }
    },
    (error) => {
      this.error = 'Email n\'a pas pu être envoyer!';
    });
  }

  updateEmail() {
    this.updateSubmit = true;
    if (this.changeEmailForm.invalid) {
      return;
    }
    const verification_code = +this.changeEmailForm.get('verification_code').value;
    this.usersService.updateEmail(this.requestId, verification_code).subscribe(data => {
      if (data) {
        this.requestId = null;
        this.updateSubmit = false;
        this.changeEmailForm.reset();
        this.changeEmailForm.get('verification_code').clearValidators();
        this.success = 'Email modifié avec succès';
        setTimeout(() => {
          this.success = null;
        }, 5000);
      } else {
        this.error = 'Code de vérification invalide';
        setTimeout(() => {
          this.error = null;
        }, 5000);
      }
    },
    (error) => {
      this.error = 'Opération échouée';
        setTimeout(() => {
          this.error = null;
        }, 5000);
    });
  }

  resetResult() {
    this.requestId = null;
    this.error = null;
    this.success = null;
    this.sendEmailSubmit = false;
    this.updateSubmit = false;
    this.changeEmailForm.get('verification_code').clearValidators();
    this.changeEmailForm.get('verification_code').updateValueAndValidity();
  }

}
