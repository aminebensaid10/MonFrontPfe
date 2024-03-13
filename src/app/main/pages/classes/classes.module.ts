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
    path: 'detail-demande-situation-familiale/:id',  
    component: DetailDemandeSituationComponent,
  },
  
  
 
]

@NgModule({
  declarations: [
    ClassesListComponent,
    DetailComponent,
    AddEditClassComponent,
    DetailDemandeSituationComponent,    
    
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
