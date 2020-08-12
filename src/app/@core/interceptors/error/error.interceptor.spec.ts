//#region angular imports

import { async, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';

//#endregion angular imports

//#region core imports

import { GlobalErrorService, LoggerService, RouteService, AuthService, StoreService } from '@core/services';
import { HttpHelper } from '@core/helper';
import { StorageType } from '@core/enums';
import { ErrorInterceptor } from '@core/interceptors/error/error.interceptor';
import { BaseSpecHelper } from '@core/spec-util/base-spec.helper';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

describe('Error interceptor Spec | ', () => {

  let specHelper: BaseSpecHelper = new BaseSpecHelper();

  function setup() {
    const routerSpy = specHelper.getRouterNavigateByUrlSpy();

    const providers: any[] = [
      { provide: Router, useValue: routerSpy },
      GlobalErrorService,
      LoggerService,
      HttpHelper,
      AuthService,
      {
        provide: StoreService,
        useValue: {
          removeData(key: string, storeType: StorageType = StorageType.None): void {
          }
        }
      },
      RouteService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      }
    ];

    specHelper.setTestBed([HttpClientTestingModule], [], providers);

    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const httpHelper: HttpHelper = TestBed.get(HttpHelper);
    const authService: AuthService = TestBed.get(AuthService);
    const errorService: GlobalErrorService = TestBed.get(GlobalErrorService);
    return { routerSpy, httpMock, httpHelper, authService, errorService };
  }

  //#region 404

  it('api throws 404 error; Expected: navigates to error page', async(() => {
    let config = setup();
    config.httpHelper.get('xyz').subscribe();
    const req = config.httpMock.expectOne('xyz');
    req.error(new ErrorEvent('404 Event'), {
      status: 404,
      statusText: '404-Error'
    });
    expect(config.routerSpy.navigateByUrl).toHaveBeenCalledWith('error');
  }));

  it('api throws 404 error; Expected: error service onErrorHandler handler is called', async(() => {
    let config = setup();
    spyOn(config.errorService, 'onErrorHandler');
    config.httpHelper.get('xyz').subscribe();
    const req = config.httpMock.expectOne('xyz');
    req.error(new ErrorEvent('404 Event'), {
      status: 404,
      statusText: '404-Error'
    });

    expect(config.errorService.onErrorHandler).toHaveBeenCalled();
  }));

  //#endregion 404

  //#region 401

  it('api throws 401 error; Expected: navigates to login page', async(() => {
    let config = setup();
    config.httpHelper.get('xyz').subscribe();
    const req = config.httpMock.expectOne('xyz');
    req.error(new ErrorEvent('401 Event'), {
      status: 401,
      statusText: '401-Error'
    });
    expect(config.routerSpy.navigateByUrl).toHaveBeenCalledWith('login');
  }));

  it('api throws 401 error; Expected: auth service onlogout handler is called', async(() => {
    let config = setup();
    spyOn(config.authService, 'onLogoutHandler');
    config.httpHelper.get('xyz').subscribe();
    const req = config.httpMock.expectOne('xyz');
    req.error(new ErrorEvent('401 Event'), {
      status: 401,
      statusText: '401-Error'
    });

    expect(config.authService.onLogoutHandler).toHaveBeenCalled();
  }));

  //#endregion 401

  //#region 500

  it('api throws 500 error; Expected: rethrows exception', async(() => {
    let config = setup();

    config.httpHelper.get('xyz').subscribe(
      (res) => {

      },
      (err: HttpErrorResponse) => {
        expect(err.message).toEqual('Http failure response for xyz: 500 500-Error');
        expect(err.status).toEqual(500);
      }
    );
    const req = config.httpMock.expectOne('xyz');
    req.error(new ErrorEvent('500 Event'), {
      status: 500,
      statusText: '500-Error'
    });
  }));

  //#endregion 500

  //#region 403

  it('api throws 403 error; Expected: rethrows exception', async(() => {
    let config = setup();

    config.httpHelper.get('xyz').subscribe(
      (res) => {

      },
      (err: HttpErrorResponse) => {
        expect(err.message).toEqual('Http failure response for xyz: 403 403-Error');
        expect(err.status).toEqual(403);
      }
    );
    const req = config.httpMock.expectOne('xyz');
    req.error(new ErrorEvent('403 Event'), {
      status: 403,
      statusText: '403-Error'
    });
  }));

  //#endregion 403

});
