//#region angular imports
import { ErrorHandler, Component, NgZone } from '@angular/core';
import { async, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { GlobalErrorService, LoggerService, RouteService } from '@core/services';
import { LoggerModel } from '@core/models';
import { HttpHelper } from '@core/helper';
import { AppErrorHandler } from '@core/providers/error-handler/app-error-handler';
import { ComponentSpecHelper } from '@core/spec-util/component-spec.helper';


//#endregion core imports

//#region functional/model imports

//#endregion functional/model imports

@Component({
  selector: 'mock-component',
  template: `<button (click)="throwError()">Throw an error!!!</button>`
})
export class MockComponent {

  public throwError(): void {
    throw Error('Mock Error');
  }

}

describe('App Error handler Spec | ', () => {

  let specHelper: ComponentSpecHelper<MockComponent> = new ComponentSpecHelper<MockComponent>();

  function setup() {

    const routerSpy = specHelper.getRouterNavigateByUrlSpy();

    const providers = [
      { provide: Router, useValue: routerSpy },
      GlobalErrorService,
      {
        provide: LoggerService, useValue: {
          logError(message: string): Observable<LoggerModel> {
            return new Observable<LoggerModel>(null);
          }
        }
      },
      RouteService,
      HttpHelper,
      { provide: ErrorHandler, useClass: AppErrorHandler }
    ];

    specHelper.setAngularTestBase([HttpClientTestingModule], [MockComponent], MockComponent, providers);

    const errorService: GlobalErrorService = TestBed.get(GlobalErrorService);
    const logService: LoggerService = TestBed.get(LoggerService);
    const fixture = specHelper.fixture;
    return { fixture, routerSpy, errorService, logService };
  }

  it('handle Error() | Error Info is set in the service', () => {
    let config = setup();
    let elem = config.fixture.debugElement.query(By.css('button'));
    elem.triggerEventHandler('click', null);

    let actual = config.errorService.getErrorInfo();
    expect('Mock Error').toEqual(actual.errorMessage);

  });

  it('handle Error() | navigates to error page', () => {
    let config = setup();
    let elem = config.fixture.debugElement.query(By.css('button'));
    elem.triggerEventHandler('click', null);
    expect(config.routerSpy.navigateByUrl).toHaveBeenCalledWith('error');
  });

});
