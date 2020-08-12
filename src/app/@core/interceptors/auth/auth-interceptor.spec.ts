//#region angular imports

import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';

//#endregion angular imports

//#region core imports

import { AuthService, StoreService } from '@core/services';
import { HttpHelper } from '@core/helper';
import { BaseSpecHelper } from '@core/spec-util/base-spec.helper';
import { AuthInterceptor } from '@app/@core/interceptors/auth/auth.interceptor';
import { CoreConstant } from '@core/core.constant';
import { StorageType } from '@app/@core/enums';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

describe('Auth interceptor Spec | ', () => {

  let specHelper: BaseSpecHelper = new BaseSpecHelper();

  function setup() {
    const routerSpy = specHelper.getRouterNavigateByUrlSpy();

    const providers: any[] = [
      HttpHelper,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: StoreService, useValue:
        {
          getDataWithoutParse(key: string, storeType: StorageType = StorageType.None): any {
            return 'Bearer Token test';
          }
        }
      },
      AuthService,
      { provide: Router, useValue: routerSpy },

    ];

    specHelper.setTestBed([HttpClientTestingModule], [], providers);

    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const httpHelper: HttpHelper = TestBed.get(HttpHelper);
    const service: AuthService = TestBed.get(AuthService);
    return { routerSpy, httpMock, httpHelper, service };
  }

  it('api request is initiated; Expected: auth token is part of api header', async(() => {
    let config = setup();
    config.httpHelper.get('xyz').subscribe();
    const req = config.httpMock.expectOne('xyz');
    let result = req.request.headers.has(CoreConstant.header.authTokenName);
    expect(result).toBe(true);
    req.flush({ success: true });
  }));

});
