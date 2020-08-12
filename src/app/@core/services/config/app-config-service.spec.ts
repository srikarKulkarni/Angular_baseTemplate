//#region angular imports

import { async, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { LoggerService, GlobalErrorService } from '@core/services';
import { ErrorModel, AppConfigModel } from '@core/models';
import { HttpHelper } from '@core/helper';
import { BaseSpecHelper } from '@core/spec-util/base-spec.helper';
import { AppConfigService } from '@app/@core/services/config/app-config.service';

//#endregion core imports

//#region functional/model imports

//#endregion functional/model imports

describe('App Config Service Spec - ', () => {

  let specHelper: BaseSpecHelper = new BaseSpecHelper();

  function setup() {
    const routerSpy = specHelper.getRouterNavigateByUrlSpy();

    const providers = [
      { provide: Router, useValue: routerSpy },
      HttpHelper,
      AppConfigService
    ];

    specHelper.setTestBed([HttpClientTestingModule], [], providers);

    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const httpHelper: HttpHelper = TestBed.get(HttpHelper);
    const appConfigService: AppConfigService = TestBed.get(AppConfigService);
    return { routerSpy, httpMock, httpHelper, appConfigService };
  }

  it('App config info is set', () => {
    let config = setup();
    const expected: AppConfigModel = new AppConfigModel();
    config.httpHelper.get('xyz').subscribe();
    const req = config.httpMock.expectOne('xyz');
    expect(config.appConfigService.getConfigData()).toEqual(expected);
    req.flush({});
  });

});
