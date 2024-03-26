import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { UsersService } from './services/users-service.service';
import { UsersListComponent } from './mes-demandes/demandes-list.component';
import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';
import { AjoutSituationFamilialeComponent } from './ajout-situation-familiale/ajout-situation-familiale.component';
import { InvitationsService } from './invitations/services/membrefamille.service';
import { MaSituationFamilialeComponent } from './ma-situation-familiale/ma-situation-familiale.component';
import { MesDemandesSituationFamilialeComponent } from './mes-demandes-situation-familiale/mes-demandes-situation-familiale.component';
import { MonAdressePrincipalComponent } from './ajout-adresse-principal/mon-adresse-principal.component';
import { MonAdressePrincipaleComponent } from './mon-adresse-principale/mon-adresse-principale.component';
import { MesDemandesDemenagementComponent } from './mes-demandes-demenagement/mes-demandes-demenagement.component';
import { CollaborateurSituationFamilialeComponent } from './collaborateur-situation-familiale/collaborateur-situation-familiale.component';
import { CollaborateurAdressePrinicpalComponent } from './collaborateur-adresse-prinicpal/collaborateur-adresse-prinicpal.component';

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
    path: 'Add-situation',
    component: AjoutSituationFamilialeComponent,
    
  },
  {
    path: 'My-situation',
    component: MaSituationFamilialeComponent,
    
  },
  {
    path: 'Collaborateur-situation',
    component: CollaborateurSituationFamilialeComponent,
    
  },
  {
    path: 'Collaborateur-adresse',
    component: CollaborateurAdressePrinicpalComponent,
    
  },
  {
    path: 'Add-address',
    component: MonAdressePrincipalComponent,
    
  },
  {
    path: 'My-address',
    component: MonAdressePrincipaleComponent,
    
  },
  {
    path: 'my-requests',
    component: MesDemandesSituationFamilialeComponent,
    
  },
  {
    path: 'my-requests-moving',
    component: MesDemandesDemenagementComponent,
    
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
    AjoutSituationFamilialeComponent,
    MaSituationFamilialeComponent,
    MesDemandesSituationFamilialeComponent,
    MonAdressePrincipalComponent,
    MonAdressePrincipaleComponent,
    MesDemandesDemenagementComponent,
    CollaborateurSituationFamilialeComponent,
    CollaborateurAdressePrinicpalComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule
  ],
  providers: [
    UsersService,
    InvitationsService
  ]
})
export class UsersModule { }
