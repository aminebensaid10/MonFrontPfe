import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

import { CoreCommonModule } from '@core/common.module';

import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';
import { NavbarSearchComponent } from 'app/layout/components/navbar/navbar-search/navbar-search.component';

import { NavbarNotificationComponent } from 'app/layout/components/navbar/navbar-notification/navbar-notification.component';
import { UsersService } from 'app/main/pages/users/services/users-service.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

@NgModule({
  declarations: [NavbarComponent, NavbarSearchComponent, NavbarNotificationComponent],
  imports: [RouterModule, NgbModule, CoreCommonModule, PerfectScrollbarModule],
  providers: [
    [UsersService],
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {}
