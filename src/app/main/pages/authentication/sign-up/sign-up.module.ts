import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { SignUpComponent } from './sign-up/sign-up.component';

// routing
const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule
  ]
})
export class SignUpModule { }
