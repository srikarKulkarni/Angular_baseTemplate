//#region angular imports

import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//#endregion angular imports

//#region core imports

import { LoaderService } from '@core/services';
import { HttpHelper } from '@core/helper';
import { LoaderStatus } from '@core/enums';
import { LoaderInterceptor } from '@core/interceptors/loader/loader.interceptor';
import { BaseSpecHelper } from '@core/spec-util/base-spec.helper';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

describe('Loader interceptor Spec | ', () => {

  let specHelper: BaseSpecHelper = new BaseSpecHelper();

  function setup() {
    const providers: any[] = [
      HttpHelper,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true
      },
      LoaderService
    ];

    specHelper.setTestBed([HttpClientTestingModule], [], providers);

    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const httpHelper: HttpHelper = TestBed.get(HttpHelper);
    const service: LoaderService = TestBed.get(LoaderService);
    return { httpMock, httpHelper, service };
  }

  it('api request is initiated; Expected: loader starts before api call', async(() => {
    let config = setup();
    config.httpHelper.get('xyz').subscribe();
    const req = config.httpMock.expectOne('xyz');
    expect(config.service.getLoaderStatus()).toBe(LoaderStatus.Start);
    req.flush({ success: true });

  }));

  it('api response is returned; Expected: loader stops after api response has been received', async(() => {
    let config = setup();
    config.httpHelper.get('xyz').subscribe();
    const req = config.httpMock.expectOne('xyz');
    req.flush({ success: true });
    expect(config.service.getLoaderStatus()).toBe(LoaderStatus.Complete);
  }));

});
