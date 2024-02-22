import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { LayoutModule } from 'app/layout/layout.module';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';



@NgModule({
  declarations: [
    ConfirmationModalComponent
  ],
  imports: [],
  exports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    LayoutModule
  ],
})
export class SharedModule { }
