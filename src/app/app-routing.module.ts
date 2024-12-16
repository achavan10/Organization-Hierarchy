import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* App level routes with lazy loading */
const routes: Routes = [
  {
    path: 'organization',
    loadChildren: () =>
      import('./organization/organization.module').then(
        (m) => m.OrganizationModule
      ),
  },
  {
    path: '',
    redirectTo: '/organization',
    pathMatch: 'full',
  },
  
  {
    path: '**',
    redirectTo: '/organization',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
