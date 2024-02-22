import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationsListComponent } from './invitations-list/invitations-list.component';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { InvitationsService } from './services/invitations.service';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

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
  }
]

@NgModule({
  declarations: [
    InvitationsListComponent,
    InviteUserComponent
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
