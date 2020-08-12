//#region angular imports

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

//#endregion angular imports

//#region modules

//#endregion modules

//#region components

import { NavBarComponent } from './nav-bar.component';

//#endregion components

//#region directives
//#endregion directives

//#region pipes/filter
//#endregion pipes/filters

//#region services

import { NavBarService } from './nav-bar.service';

//#endregion services

//#region handlers/providers
//#endregion handlers/providers

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
  ],
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ],
  providers: [
    NavBarService
  ]
})
export class NavBarModule {
}



