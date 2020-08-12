//#region angular imports

import { async, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { UserModel } from '@core/models';
import { HttpHelper } from '@core/helper';
import { BaseSpecHelper } from '@core/spec-util/base-spec.helper';
import { AuthService } from '@core/services/auth/auth.service';
import { StoreService } from '@core/services/store/store.service';
import { CoreConstant } from '@core/core.constant';
import { StorageType } from '@core/enums';
import { CustomStorage } from '@core/storage';

//#endregion core imports

//#region functional/model imports

//#endregion functional/model imports

describe('Auth Service Spec | ', () => {

  let specHelper: BaseSpecHelper = new BaseSpecHelper();

  function setup() {

    const routerSpy = specHelper.getRouterNavigateByUrlSpy();
    const providers = [
      { provide: Router, useValue: routerSpy },
      AuthService,
      HttpHelper,
      StoreService,
      { provide: CoreConstant.injectKey.globalStoreType, useValue: StorageType.Session },
      CustomStorage
    ];
    specHelper.setTestBed([HttpClientTestingModule], [], providers);

    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const httpHelper: HttpHelper = TestBed.get(HttpHelper);
    const service: AuthService = TestBed.get(AuthService);
    const storeService: StoreService = TestBed.get(StoreService);
    return { routerSpy, httpMock, httpHelper, service, storeService };
  }

  it('setAuthenticationStatus sets isUserAuthenticated observable ', () => {
    let config = setup();
    let inputStatus: boolean = false;
    config.service.isUserAuthenticated.subscribe((val) => {
      expect(val).toBe(inputStatus)
    });
    config.service.setAuthenticationStatus(inputStatus);

  });

  it('onLoginHandler performs after login steps', () => {
    let config = setup();
    //set auth status to false as default
    config.service.setAuthenticationStatus(false);

    let user: UserModel = new UserModel();
    user.userName = 'test user';
    user.email = '';
    user.firstName = '';
    user.lastName = '';

    spyOn(config.storeService, 'setDataWithoutJSON');

    config.service.onLoginHandler(user, 'Bearer test token');

    expect(config.storeService.setDataWithoutJSON).toHaveBeenCalled();
    config.service.isUserAuthenticated.subscribe((val) => {
      expect(val).toBeTruthy();
    });
    expect(config.service.getUserInfo()).toEqual(user);
  });

  it('getAuthToken retrieves stored token', () => {
    let config = setup();

    //defaults
    let token: string = 'Bearer test token';
    let user: UserModel = new UserModel();
    user.userName = 'test user';

    spyOn(config.storeService, 'setDataWithoutJSON');
    spyOn(config.storeService, 'getDataWithoutParse').and.returnValue(token);
    //First set user as logged in by default
    config.service.onLoginHandler(user, token);

    expect(config.service.getAuthToken()).toEqual(token);
  });

  it('getUserInfo retrieves stored user info', () => {
    let config = setup();

    //defaults
    let token: string = 'Bearer test token';
    let user: UserModel = new UserModel();
    user.userName = 'test user';
    user.email = '';
    user.firstName = '';
    user.lastName = '';

    spyOn(config.storeService, 'setDataWithoutJSON');

    //First set user as logged in by default
    config.service.onLoginHandler(user, token);

    expect(config.service.getUserInfo()).toEqual(user);
  });

  it('onLogoutHandler performs after logout steps', () => {
    let config = setup();

    //defaults
    let token: string = 'Bearer test token';
    let user: UserModel = new UserModel();
    user.userName = 'test user';

    spyOn(config.storeService, 'setDataWithoutJSON');
    spyOn(config.storeService, 'removeData');

    //First set user as logged in by default
    config.service.onLoginHandler(user, token);

    //on logout call
    config.service.onLogoutHandler();

    expect(config.storeService.removeData).toHaveBeenCalled();
    config.service.isUserAuthenticated.subscribe((val) => {
      expect(val).toBeFalsy();
    });
    expect(config.service.getUserInfo()).toEqual(new UserModel());
  });

});
