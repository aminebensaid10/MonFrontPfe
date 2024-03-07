import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationsListComponent } from './membrefamille-list/membrefamille-list.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { InvitationsService } from './services/membrefamille.service';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'invitations-list',
    pathMatch: 'full'
  },
  {
    path: 'invitations-list',
    component: InvitationsListComponent,
  },
  {
    path: 'invite-user',
    component: InviteUserComponent
  },
  {
    path: 'update-member/:id',
    component: UpdateUserComponent
  }
]

@NgModule({
  declarations: [
    InvitationsListComponent,
    InviteUserComponent,
    UpdateUserComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule
  ],
  providers: [
    InvitationsService
  ]
})
export class InvitationsModule { }
