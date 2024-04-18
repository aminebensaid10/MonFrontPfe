import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SampleComponent } from './sample.component';
import { HomeComponent } from './home.component';
import { TableauBordDemandesComponent } from './tableau-bord-demandes/tableau-bord-demandes.component';
import { TableauBordModeTransportComponent } from './tableau-bord-mode-transport/tableau-bord-mode-transport.component';

const routes = [
  {
    path: 'sample',
    component: SampleComponent,
    data: { animation: 'sample' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  },
  {
    path: 'demandes',
    component: TableauBordDemandesComponent,
    data: { animation: 'home' }
  },
  {
    path: 'mode-transport-dashboard',
    component: TableauBordModeTransportComponent,
    data: { animation: 'home' }
  }
];

@NgModule({
  declarations: [SampleComponent, HomeComponent, TableauBordDemandesComponent, TableauBordModeTransportComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,NgxChartsModule
  ],
  exports: [SampleComponent, HomeComponent]
})
export class SampleModule {}
