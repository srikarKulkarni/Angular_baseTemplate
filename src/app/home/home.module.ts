//#region angular imports

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//#endregion angular imports

//#region modules

//#endregion modules

//#region components

import { HomeComponent } from './home.component';

//#endregion components

//#region directives
//#endregion directives

//#region pipes/filter
//#endregion pipes/filters

//#region services
//#endregion services

//#region handlers/providers
//#endregion handlers/providers

import { routeConfig } from './home.routing';

@NgModule({
  imports: [
    RouterModule.forChild(routeConfig)
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
  ]
})
export class HomeModule {
}



