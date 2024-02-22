import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditAccessRightsComponent } from './edit-access-rights/edit-access-rights.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: '',
    component: EditProfileComponent
  },
  
]

@NgModule({
  declarations: [EditProfileComponent, GeneralInfoComponent, ChangePasswordComponent, EditAccessRightsComponent, ChangeEmailComponent],
  imports: [
    SharedModule,
    Ng2FlatpickrModule,
    RouterModule.forChild(routes)
  ]
})
export class EditProfileModule { }
