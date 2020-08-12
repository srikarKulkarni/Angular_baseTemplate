//#region angular imports

import { async, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { LoggerService, GlobalErrorService } from '@core/services';
import { ErrorModel } from '@core/models';
import { HttpHelper } from '@core/helper';
import { BaseSpecHelper } from '@core/spec-util/base-spec.helper';

//#endregion core imports

//#region functional/model imports

//#endregion functional/model imports

describe('Global Error Service Spec | ', () => {

  let specHelper: BaseSpecHelper = new BaseSpecHelper();

  function setup() {
    const routerSpy = specHelper.getRouterNavigateByUrlSpy();

    const providers = [
      { provide: Router, useValue: routerSpy },
      GlobalErrorService,
      LoggerService,
      HttpHelper
    ];
    specHelper.setTestBed([HttpClientTestingModule], [], providers);
    
    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const httpHelper: HttpHelper = TestBed.get(HttpHelper);
    const errorService: GlobalErrorService = TestBed.get(GlobalErrorService);
    const logService: LoggerService = TestBed.get(LoggerService);
    return { routerSpy, httpMock, httpHelper, errorService, logService };
  }

  it('getErrorInfo', () => {
    let config = setup();
    const expected: ErrorModel = {
      canNotify: false,
      errorLogResponse: new Observable<any>(),
      errorMessage: 'Test message',
      statusCode: 500
    };
    config.errorService.onErrorHandler(expected);
    let actual = config.errorService.getErrorInfo();

    expect(expected.canNotify).toEqual(actual.canNotify);
    expect(expected.errorMessage).toEqual(actual.errorMessage);
    expect(expected.statusCode).toEqual(actual.statusCode);
    expect(expected.errorLogResponse).toEqual(actual.errorLogResponse);

  });

  it('onErrorHandler | logs error', () => {
    let config = setup();
    const expected: ErrorModel = {
      canNotify: false,
      errorLogResponse: new Observable<any>(),
      errorMessage: 'Test message',
      statusCode: 500
    };
    spyOn(config.logService, 'logError');

    config.errorService.onErrorHandler(expected);

    expect(config.logService.logError).toHaveBeenCalled();

  });

  it('onErrorHandler | sets error', () => {
    let config = setup();
    const expected: ErrorModel = {
      canNotify: false,
      errorLogResponse: new Observable<any>(),
      errorMessage: 'Test message',
      statusCode: 500
    };
    config.errorService.onErrorHandler(expected);

    let actual = config.errorService.getErrorInfo();
    
    expect(expected.canNotify).toEqual(actual.canNotify);
    expect(expected.errorMessage).toEqual(actual.errorMessage);
    expect(expected.statusCode).toEqual(actual.statusCode);
    expect(expected.errorLogResponse).toEqual(actual.errorLogResponse);

  });
  
  it('clearErrorState', () => {
    let config = setup();
    const expected: ErrorModel = {
      canNotify: false,
      errorLogResponse: new Observable<any>(),
      errorMessage: 'Test message',
      statusCode: 500
    };
    config.errorService.onErrorHandler(expected);
    config.errorService.clearErrorState();
    let actual = config.errorService.getErrorInfo();
    expect(actual.errorMessage).toBeUndefined();
    expect(actual.statusCode).toBeUndefined();
  });

  it('notifyGlobalError | canNotify is true; expected observable returns true', () => {
    let config = setup();
    const expected: ErrorModel = {
      canNotify: true,
      errorLogResponse: new Observable<any>(),
      errorMessage: 'Test message',
      statusCode: 500
    };
   
    config.errorService.onErrorHandler(expected);
    config.errorService.isGlobalError.subscribe(
      (val) => {
        expect(val).toBeTruthy();
      }
    );
  });

  it('notifyGlobalError | canNotify is false; expected observable returns false', () => {
    let config = setup();
    const expected: ErrorModel = {
      canNotify: false,
      errorLogResponse: new Observable<any>(),
      errorMessage: 'Test message',
      statusCode: 500
    };
    
    config.errorService.onErrorHandler(expected);
    config.errorService.isGlobalError.subscribe(
      (val) => {
        expect(val).toBeFalsy();

      }
    );
  });

});
