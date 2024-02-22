import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLoginV2Component } from 'app/main/pages/authentication/auth-login-v2/auth-login-v2.component';
import { SharedModule } from 'app/shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up/sign-up.component';

// routing
const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginV2Component,
    data: { animation: 'auth' }
  },
  {
    path: 'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: 'authentication/register-v2',
    component: SignUpComponent
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  }

];

@NgModule({
  declarations: [AuthLoginV2Component],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class AuthenticationModule {}
