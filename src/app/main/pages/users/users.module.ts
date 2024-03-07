import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { UsersService } from './services/users-service.service';
import { UsersListComponent } from './mes-demandes/demandes-list.component';
import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile/user-profile/null',
    pathMatch: 'full'
  },
  {
    path: 'users-list',
    component: UsersListComponent,
    
  },
  {
    path: 'invitations',
    loadChildren: () => import('./invitations/membrefamille.module').then(m => m.InvitationsModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  }
]

@NgModule({
  declarations: [
    UsersListComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
