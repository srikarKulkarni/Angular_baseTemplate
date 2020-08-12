//#region angular imports

import { async, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

//#endregion angular imports

//#region core imports

import { LoggerModel } from '@core/models';
import { HttpHelper } from '@core/helper';
import { CoreUrl } from '@core/core.url';
import { LogLevel } from '@core/enums';

//#endregion core imports

//#region functional/model imports

import { LoggerService } from '@core/services/logger/logger.service';
import { BaseSpecHelper } from '@app/@core/spec-util/base-spec.helper';


//#endregion functional/model imports

describe('Logger Service Spec - ', () => {

  let specHelper: BaseSpecHelper = new BaseSpecHelper();

  let httpMock: HttpTestingController;
  let service: LoggerService;
  let httpHelper: HttpHelper;

  beforeEach(() => {

    specHelper.setTestBed([HttpClientTestingModule], [], [LoggerService, HttpHelper]);

    service = TestBed.get(LoggerService);
    httpMock = TestBed.get(HttpTestingController);
    httpHelper = TestBed.get(HttpHelper);
  });

  describe('logInfo', () => {

    it('should return an Observable<LoggerModel>', () => {
      let message = 'info mesage log';
      const expected: LoggerModel = {
        logLevel: LogLevel.Info,
        logMessage: 'info mesage log',
        referenceNumber: 'abc123'
      };
      service.logInfo(message).subscribe((actual) => {
        expect(expected).toEqual(actual, 'logInfo response is not same as expected');
      });
      httpHelper.post('xyz', message).subscribe();
      const testReq: TestRequest = httpMock.expectOne('xyz');
      expect(testReq.request.method).toBe("POST", 'logInfo method type is not POST');
      testReq.flush(expected);
      httpMock.verify();

    });

  });

  describe('logError', () => {

    it('should return an Observable<LoggerModel>', () => {
      let message = 'error mesage log';
      const expected: LoggerModel = {
        logLevel: LogLevel.Info,
        logMessage: 'error mesage log',
        referenceNumber: 'abc123'
      };
      service.logError(message).subscribe((actual) => {
        expect(expected).toEqual(actual, 'logError response is not same as expected');
      });
      httpHelper.post('xyz', message).subscribe();
      const testReq: TestRequest = httpMock.expectOne('xyz');
      expect(testReq.request.method).toBe("POST", 'logError method type is not POST');
      testReq.flush(expected);
      httpMock.verify();

    });

  });

});
