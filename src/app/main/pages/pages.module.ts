import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MainLayoutPageComponent } from '../main-layout-page/main-layout-page.component';
import { SignUpModule } from './authentication/sign-up/sign-up.module';
 

const appRoutes: Routes = [
  {
    path: '',
    component: MainLayoutPageComponent,
    children: [
    {
      path: 'users',
      loadChildren: () => import('../pages/users/users.module').then(m => m.UsersModule),
      data: {
        role: {
          page: 'users',
        }
      },
    },
    {
      path: 'demandes',
      loadChildren: () => import('../pages/classes/classes.module').then(m => m.ClassesModule),
      data: {
        role: {
          page: 'classes',
        }
      },
      
    }
    
    ]
  }
  
];

@NgModule({
  declarations: [
    MainLayoutPageComponent
    
  ],
  imports: [
    SharedModule,SignUpModule,
    RouterModule.forChild(appRoutes),
  ],

  providers: []
})
export class PagesModule {}
