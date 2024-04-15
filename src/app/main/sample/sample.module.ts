import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SampleComponent } from './sample.component';
import { HomeComponent } from './home.component';
import { TableauBordDemandesComponent } from './tableau-bord-demandes/tableau-bord-demandes.component';

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
  }
];

@NgModule({
  declarations: [SampleComponent, HomeComponent, TableauBordDemandesComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule,NgxChartsModule
  ],
  exports: [SampleComponent, HomeComponent]
})
export class SampleModule {}
