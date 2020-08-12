//#region angular imports

import { NgModule, ModuleWithProviders, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//#endregion angular imports

//#region services

import {
  AppConfigService,
  AuthService,
  GlobalErrorService,
  GlobalEventManagerService,
  LoaderService,
  LoggerService,
  StoreService,
  RouteService
} from '@core/services';

//#endregion services

//#region providers

import {
  AppErrorHandler
} from '@core/providers';

//#endregion providers

//#region core interceptors

import {
  AuthInterceptor,
  ErrorInterceptor,
  LoaderInterceptor
} from '@core/interceptors';

//#endregion core interceptors

//#region helpers/utilities/configs

import { HttpHelper } from '@core/helper';
import { CustomStorage } from '@core/storage';
import { CoreConstant } from '@core/core.constant';
import { StorageType } from '@core/enums';

//#endregion helpers/utilities/configs

const coreServices = [
  AppConfigService,
  AuthService,
  GlobalErrorService,
  GlobalEventManagerService,
  LoaderService,
  LoggerService,
  RouteService,
  StoreService
];

const coreInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

const coreProviders = [
  { provide: ErrorHandler, useClass: AppErrorHandler }
];

@NgModule({
  imports: [
  ],
  declarations: [

    //#region components
    //#endregion components

  ],
  exports: [

    //#region modules
    //#endregion modules

    //#region components
    //#endregion components

    //#region directives
    //#endregion directives

    //#region pipes/filters
    //#endregion pipes/filters

  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        CustomStorage,
        HttpHelper,
        { provide: CoreConstant.injectKey.globalStoreType, useValue: StorageType.Session },
        coreServices,
        HttpClientModule,
        coreInterceptors,
        coreProviders
      ],
    };
  }
}

