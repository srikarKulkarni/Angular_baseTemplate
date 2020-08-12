//#region angular imports

import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

//#endregion angular imports

//#region core imports

import { AuthGuardService } from '@core/gaurds/auth-gaurd';
import { AuthService, StoreService } from '@core/services';

//#endregion core imports

//#region functional/model imports

import { BaseSpecHelper } from '@app/@core/spec-util/base-spec.helper';

//#endregion functional/model imports

describe('Auth Gaurd Spec | ', () => {

  let specHelper: BaseSpecHelper = new BaseSpecHelper();

  function setup() {
    const routerSpy = specHelper.getRouterNavigateByUrlSpy();

    const providers: any[] = [
      { provide: Router, useValue: routerSpy },
      { provide: StoreService, useValue: {} },
      AuthService,
      AuthGuardService
    ];

    specHelper.setTestBed([], [], providers);

    const authGaurd = TestBed.get(AuthGuardService);
    const authService = TestBed.get(AuthService);
    return { authGaurd, authService, routerSpy };
  }

  //#region case - user is authenticated

  it('User is authenticated | Expected: returns true', async(() => {
    let config = setup();
    config.authService.setAuthenticationStatus(true);
    let actualResult = config.authGaurd.canActivate();
    actualResult.subscribe((val) => {
      expect(val).toBe(true);
    });
  }));

  //#endregion case - user is authenticated

  //#region case - user is not authenticated

  it('User is not authenticated | Expected: returns false', async(() => {
    let config = setup();
    config.authService.setAuthenticationStatus(false);
    let actualResult = config.authGaurd.canActivate();
    actualResult.subscribe((val) => {
      expect(val).toBe(false);
    });
  }));

  it('User is not authenticated | Expected: navigates to login url', async(() => {
    let config = setup();
    config.authService.setAuthenticationStatus(false);
    let actualResult = config.authGaurd.canActivate();
    // args passed to router.navigateByUrl() spy
    actualResult.subscribe((val) => {
      expect(config.routerSpy.navigateByUrl).toHaveBeenCalledWith('login');
    });
  }));

  //#endregion case - user is not authenticated

});
