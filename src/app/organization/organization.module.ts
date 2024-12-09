import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphViewComponent } from './components/graph-view/graph-view.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationLoader } from '../translation.loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [GraphViewComponent, GridViewComponent],
  imports: [
    CommonModule,
    OrganizationChartModule,
    SharedModule,
    OrganizationRoutingModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslationLoader(http),
        deps: [HttpClient],
      },
    }),
  ]
})
export class OrganizationModule { }
