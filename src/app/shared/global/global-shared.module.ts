//#region angular imports

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

//#endregion angular imports

//#region modules

import { NavBarModule } from '@shared/global/nav-bar';

//#endregion modules

//#region components

import { AppFooterComponent, AppHeaderComponent, ErrorComponent, LoaderComponent } from '@shared/global/components';

//#endregion components

//#region directives
//#endregion directives

//#region pipes/filter
//#endregion pipes/filters

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    NavBarModule
  ],
  declarations: [

    //#region components

    AppFooterComponent,
    AppHeaderComponent,
    ErrorComponent,
    LoaderComponent,

    //#endregion components

  ],
  exports: [

    //#region modules

    NavBarModule,

    //#endregion modules

    //#region components

    AppFooterComponent,
    AppHeaderComponent,
    ErrorComponent,
    LoaderComponent,

    //#endregion components

    //#region directives
    //#endregion directives

    //#region pipes/filters
    //#endregion pipes/filters

  ]
})
export class GlobalSharedModule {
}
