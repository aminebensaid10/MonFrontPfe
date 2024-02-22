import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ForgotPasswordService } from '../services/forgot-password.service';

@Component({
  selector: 'app-reinit-password',
  templateUrl: './reinit-password.component.html',
  styleUrls: ['./reinit-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReinitPasswordComponent implements OnInit {
  // Public
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: FormGroup;
  public submitted = false;
  invalidLink = false;



  // Private
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, 
    private forgotPwdService: ForgotPasswordService, private router: Router) {
    
    this.forgotPwdService.resetPasswordValidation(this.route.snapshot.params.id).subscribe(data => {
      if (!data) {
        this.router.navigate(['/miscellaneous',
        'Url invalide',
        'Ce lien n\'est plus',
        '/auth/login',
        'Connexion'
      ]);
      }
    },
    (error) => {
      this.router.navigate(['/miscellaneous',
        'Url invalide',
        'Ce lien n\'est plus',
        '/auth/login',
        'Connexion'
      ]);
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleConfPasswordTextType() {
    this.confPasswordTextType = !this.confPasswordTextType;
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid || this.resetPasswordForm.get('newPassword').value != this.resetPasswordForm.get('confirmPassword').value) {
      return;
    }

    this.forgotPwdService.resetPassword(this.route.snapshot.params.id, this.resetPasswordForm.get('newPassword').value).subscribe(data => {
      this.router.navigate(['/auth/login']);
    });

  }



  ngOnInit(): void {
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }


  ngOnDestroy(): void {
  }
}
