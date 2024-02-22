import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import 'hammerjs';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast
 
import { CoreModule } from '@core/core.module';
import { CoreSidebarModule } from '@core/components';
import { coreConfig } from 'app/app-config';
import { AppComponent } from 'app/app.component';
import { SharedModule } from './shared/shared.module';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ErrorInterceptor } from './auth/helpers/error.interceptor';
import { JwtInterceptor } from './auth/helpers/jwt.interceptor';


registerLocaleData(localeFr, 'fr');

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
  },
 
  {
    path: 'auth',
    loadChildren: () => import('./main/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  // {
  //   path: 'signup',
  //   loadChildren: () => import('./main/pages/authentication/sign-up/sign-up.module').then(m => m.SignUpModule),
  // },
  // {
  //   path: '**',
  //   redirectTo: 'miscellaneous' //Error 404 - Page not found
  // },
  // {
  //   path: 'miscellaneous/:header/:message/:link/:btnText',
  //   loadChildren: () => import('./main/pages/miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule)
  // }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy',
      preloadingStrategy: PreloadAllModules,
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      toastClass: 'toast ngx-toastr',
      closeButton: true
      }),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreSidebarModule,
    
    // shared modules
    SharedModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: JwtInterceptor,  
      multi: true  
    },
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: ErrorInterceptor,  
      multi: true  
    },
    {
      provide: LOCALE_ID, useValue: 'fr'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
