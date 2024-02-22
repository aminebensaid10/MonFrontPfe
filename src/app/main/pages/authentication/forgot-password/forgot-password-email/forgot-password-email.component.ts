import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreConfigService } from '@core/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ForgotPasswordService } from '../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordEmailComponent implements OnInit {
 // Public
 forgotPasswordForm: FormGroup;
 submitted = false;
 emailSent = false;
 emailNotFound = false;

 // Private
 private _unsubscribeAll: Subject<any>;


 constructor(private forgotPwdService: ForgotPasswordService, private _formBuilder: FormBuilder,
  private toastr: ToastrService) {
   this._unsubscribeAll = new Subject();

 }

 // convenience getter for easy access to form fields
 get f() {
   return this.forgotPasswordForm.controls;
 }

 /**
  * On Submit
  */
 onSubmit() {
   this.submitted = true;

   // stop here if form is invalid
   if (this.forgotPasswordForm.invalid) {
     return;
   }

   this.forgotPwdService.sendForgotPasswordLink(this.forgotPasswordForm.get('email').value).subscribe(data => {
    if (data) {
      this.emailSent = true;
    } else {
      this.emailNotFound = true;
    }
   }, 
   (error) => {
    this.toastr.error('Opération échouée', 'Échec');
   });

 }

 

 /**
  * On init
  */
 ngOnInit(): void {
   this.forgotPasswordForm = this._formBuilder.group({
     email: ['', [Validators.required, Validators.email]]
   });
 }

 /**
  * On destroy
  */
 ngOnDestroy(): void {

 }
}