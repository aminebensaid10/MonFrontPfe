import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { AddEditClassComponent } from './add-edit-class/add-edit-class.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { InvitationsService } from '../users/invitations/services/invitations.service';
import { DetailComponent } from './detail/detail.component';

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
 
]

@NgModule({
  declarations: [
    ClassesListComponent,
    DetailComponent,
    
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule
  ],
  providers: [
    
  ]
})
export class ClassesModule { }
