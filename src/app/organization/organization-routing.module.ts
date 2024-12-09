import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphViewComponent } from './components/graph-view/graph-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';

/* Routes for Organization module */
const routes: Routes = [
  { path: '', redirectTo: '/graph-view', pathMatch: 'full' },
  { path: 'graph-view', component: GraphViewComponent },
  { path: 'grid-view', component: GridViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
