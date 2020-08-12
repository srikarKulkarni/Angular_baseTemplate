//#region angular imports

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


//#endregion angular imports

//#region modules

import { CoreModule } from '@app/@core';
import { GlobalSharedModule } from '@shared/global';

//#endregion modules

//#region components

import { AppComponent } from './app.component';

//#endregion components

//#region directives
//#endregion directives

//#region pipes/filter
//#endregion pipes/filters

//#region services
//#endregion services

//#region handlers/providers
//#endregion handlers/providers

import { routeConfig } from './app.routing';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routeConfig, {
      onSameUrlNavigation: 'ignore'
    }),
    ReactiveFormsModule,
    CoreModule.forRoot(),
    GlobalSharedModule,
  ],
  declarations: [

    //#region modules

    //#endregion modules

    //#region components

    AppComponent,

    //#endregion components

    //#region directives
    //#endregion directives

  ],
  bootstrap: [AppComponent],
  providers: [
  ]
})
export class AppModule {
}



