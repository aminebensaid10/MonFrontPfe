import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { AddEditClassComponent } from './add-edit-class/add-edit-class.component';



@NgModule({
  declarations: [
    ClassesListComponent,
    AddEditClassComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClassesModule { }
