import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesListComponent } from './demande-list/demande-list.component';
import { AddEditClassComponent } from './gerer-situation-familiale/add-edit-class.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { InvitationsService } from '../users/invitations/services/membrefamille.service';
import { DetailComponent } from './detail/detail.component';
import { DetailDemandeSituationComponent } from './detail-demande-situation/detail-demande-situation.component';
import { GererDemandesDemenagementsComponent } from './gerer-demandes-demenagements/gerer-demandes-demenagements.component';
import { DetailDemandeDemenagementComponent } from './detail-demande-demenagement/detail-demande-demenagement.component';
import { MembreFamilleComponent } from './membre-famille/membre-famille.component';
import { GererDemandesModeTransportComponent } from './gerer-demandes-mode-transport/gerer-demandes-mode-transport.component';
import { DetailDemandeModeDuTransportComponent } from './detail-demande-mode-du-transport/detail-demande-mode-du-transport.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'demandes-list',
  //   pathMatch: 'full'
  // },
  {
    path: 'demandes-list',
    component: ClassesListComponent,
  }, {
    path: 'demandes-detail/:id',  
    component: DetailComponent,
  },
  {
    path: 'Demandes-situation-familiale',  
    component: AddEditClassComponent,
  },
  {
    path: 'Demandes-demenagements',  
    component: GererDemandesDemenagementsComponent,
  },
  {
    path: 'demandes-mode-transport',  
    component: GererDemandesModeTransportComponent,
  },
  {
    path: 'Membres-familles',  
    component: MembreFamilleComponent,
  },
  {
    path: 'detail-demande-situation-familiale/:id',  
    component: DetailDemandeSituationComponent,
  },
  {
    path: 'detail-demande-demenagement/:id',  
    component: DetailDemandeDemenagementComponent,
  },
  {
    path: 'detail-demande-mode-transport/:id',  
    component: DetailDemandeModeDuTransportComponent,
  },
  
 
]

@NgModule({
  declarations: [
    ClassesListComponent,
    DetailComponent,
    AddEditClassComponent,
    DetailDemandeSituationComponent,
    GererDemandesDemenagementsComponent,
    DetailDemandeDemenagementComponent,
    MembreFamilleComponent,
    GererDemandesModeTransportComponent,
    DetailDemandeModeDuTransportComponent,    
    
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule,
    
  ],
  providers: [
    
  ]
})
export class ClassesModule { }
