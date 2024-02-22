import { NgModule } from '@angular/core';
import { ReinitPasswordComponent } from './reinit-password/reinit-password.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordEmailComponent } from './forgot-password-email/forgot-password-email.component';
import { SharedModule } from 'app/shared/shared.module';
import { ForgotPasswordService } from './services/forgot-password.service';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordEmailComponent
  },
  {
    path: 'reinit-password/:id',
    component: ReinitPasswordComponent
  }
]

@NgModule({
  declarations: [
    ReinitPasswordComponent,
    ForgotPasswordEmailComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ForgotPasswordService
  ]
})
export class ForgotPasswordModule { }
