import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser } from 'app/main/models/users';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public error = '';
  public passwordTextType: boolean;
  user = {
    email: '',
    password: '',
  };
  erreurLogin = '';


 
  constructor(
    @Inject(DOCUMENT) private document: any,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) 
  {
  }
  connexion() {
    this.authService.login(this.user.email, this.user.password).subscribe(
      (response) => {
        console.log('Connexion réussie :', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/pages/users']);
        } else {
         
          this.erreurLogin = 'Mauvaise combinaison e-mail/mot de passe.';
        }
      },
      (error) => {
        console.error('Échec de la connexion :', error);
        if (error.status === 403) {
          this.erreurLogin = 'Mauvaise combinaison e-mail/mot de passe.';
        } else {
          this.erreurLogin = 'Mauvaise combinaison e-mail/mot de passe';
        }
      }
    );
  }
  
  
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Login
    this.loading = true;
    const fake = {
      "access_rights": {},
      "avatar"
        :
        "user.png",
      "firstname"
        :
        "Bensaid",
      "id"
        :
        "63741e60426bd7e185e2efd4",
      "lastname"
        :
        "Mohamed Amine",
      "token"
        :
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3NDFlNjA0MjZiZDdlMTg1ZTJlZmQ0IiwiYWNjZXNzX3JpZ2h0cyI6eyJzdG9jayI6IndyaXRlIiwib3JkZXJzIjoicmVhZF9hbGwiLCJpbnZlbnRvcnkiOiJ3cml0ZSIsImRhc2hib2FyZEIyYyI6InJlYWRfYWxsIiwiYjJiIjoid3JpdGUiLCJidXNpbmVzc0ludGVsbGlnZW5jZSI6IndyaXRlIiwib2JqZWN0aXZlIjoid3JpdGUiLCJkZXBvc2l0U2FsZXMiOiJyZWFkX2FsbCIsInVzZXJzIjoid3JpdGUiLCJyaXNrTWFuYWdlbWVudCI6IndyaXRlIiwiYWRtaW5GbG93TWFuYWdlciI6IndyaXRlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTY2ODg1NzQwNSwiZXhwIjoxNjY4ODcxODA1fQ.sURjH1NkYv76Qa4NSJFVi5v3Gj7VlsM4uhSdRaNM0NE"
    }
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(fake));
    // this.authService.currentUserSubject.next(fake);
    this.router.navigate(['/pages/users']);          

    this.authService.login(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    ).subscribe(data => {
      if (data == "inactif") {
        this.error = "Ce compte n'est plus actif";
      } else if(data == "invalid") {
        this.error = "Email ou mot de passe incorrect"
      } else {
        this.router.navigate(['/pages/users']);          
      }
      this.loading = false;
    },
    (error) => {
      this.loading = false;
      this.toastr.error('Opération échouée', 'Échec', {
        positionClass: 'toast-bottom-right',
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    });

  }
  
  


  ngOnInit(): void {

    this.authService.logout();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  
  }

}
