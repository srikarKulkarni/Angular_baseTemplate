//#region angular imports

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { GlobalErrorService, LoggerService, LoggerModel, HttpHelper, GlobalEventManagerService } from '@app/@core';
import { BaseSpecHelper } from '@app/@core/spec-util/base-spec.helper';
import { ComponentSpecHelper } from '@app/@core/spec-util/component-spec.helper';

//#endregion core imports

//#region functional/model imports

import { ErrorComponent } from '@app/shared/global/components/error/error.component';

//#endregion functional/model imports


describe('ErrorComponent | ', () => {

  let specHelper: ComponentSpecHelper<ErrorComponent> = new ComponentSpecHelper<ErrorComponent>();

  function setup() {
    const routerSpy = specHelper.getRouterNavigateByUrlSpy();

    const providers: any[] = [
      GlobalErrorService,
      {
        provide: LoggerService, useValue: {
          logError(message: string): Observable<LoggerModel> {
            return new Observable<LoggerModel>(null);
          }
        }
      },
      HttpHelper,
      GlobalEventManagerService,
      { provide: Router, useValue: routerSpy },
    ];

    specHelper.setAngularTestBase([HttpClientTestingModule, RouterModule], [ErrorComponent], ErrorComponent, providers);

    const errorService: GlobalErrorService = TestBed.get(GlobalErrorService);
    const fixture = specHelper.fixture;
    const component = specHelper.component;
    return { fixture, component, errorService };
  }

  it('should create', () => {
    let config = setup();
    expect(config.component).toBeTruthy();
  });

  it('on bad request error; expected: displays bad request error section', () => {
    let config = setup();
    let statusCode = 400;
    let errMsg = 'This is test message';

    config.errorService.onErrorHandler(
      {
        canNotify: false,
        errorLogResponse: new Observable<LoggerModel>(null),
        errorMessage: errMsg,
        statusCode: statusCode
      });

    config.component.ngOnInit();
    config.fixture.detectChanges();

    expect(config.component.errorModel.statusCode).toEqual(statusCode);

    let actual = config.fixture.debugElement.nativeElement.querySelector('h1').textContent;
    expect(statusCode.toString()).toEqual(actual);

  });

  it('on un authorized error; expected: displays un authorized error section', () => {
    let config = setup();
    let statusCode = 403;
    let errMsg = 'This is test message';

    config.errorService.onErrorHandler(
      {
        canNotify: false,
        errorLogResponse: new Observable<LoggerModel>(null),
        errorMessage: errMsg,
        statusCode: statusCode
      });

    config.component.ngOnInit();
    config.fixture.detectChanges();

    expect(config.component.errorModel.statusCode).toEqual(statusCode);

    let actual = config.fixture.debugElement.nativeElement.querySelector('h1').textContent;
    expect(statusCode.toString()).toEqual(actual);

  });

  it('on page not found; expected: displays pagee not found error section', () => {
    let config = setup();
    let statusCode = 404;
    let errMsg = 'This is test message';

    config.errorService.onErrorHandler(
      {
        canNotify: false,
        errorLogResponse: new Observable<LoggerModel>(null),
        errorMessage: errMsg,
        statusCode: statusCode
      });

    config.component.ngOnInit();
    config.fixture.detectChanges();

    expect(config.component.errorModel.statusCode).toEqual(statusCode);

    let actual = config.fixture.debugElement.nativeElement.querySelector('h1').textContent;
    expect(statusCode.toString()).toEqual(actual);

  });

  it('on server error; expected: displays server error section', () => {
    let config = setup();
    let statusCode = 500;
    let errMsg = 'This is test message';

    config.errorService.onErrorHandler(
      {
        canNotify: false,
        errorLogResponse: new Observable<LoggerModel>(null),
        errorMessage: errMsg,
        statusCode: statusCode
      });

    config.component.ngOnInit();
    config.fixture.detectChanges();

    expect(config.component.errorModel.statusCode).toEqual(statusCode);

    let actual = config.fixture.debugElement.nativeElement.querySelector('h1').textContent;
    expect(statusCode.toString()).toEqual(actual);

  });
});
