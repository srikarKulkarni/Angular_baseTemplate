//#region angular imports

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { LoggerModel } from '@core/models';
import { HttpHelper } from '@core/helper';
import { CoreUrl } from '@core/core.url';
import { LogLevel } from '@core/enums';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

@Injectable()

export class LoggerService {

  //#region model properties
  //#endregion model properties

  //#region constructor

  constructor(private httpHelper: HttpHelper) {
  }

  //#endregion constructor

  //#region public functions

  /**
   * logs info message
   * @param message
   */
  public logInfo(message: string): Observable<LoggerModel> {
    return this.logData(LogLevel.Info, message);
  }

  /**
   * logs info message
   * @param message
   */
  public logError(message: string): Observable<LoggerModel> {
    return this.logData(LogLevel.Error, message);
  }

  //#endregion public functions

  //#region private functions

  /**
   * processes log information
   * @param logLevel
   * @param message
   */
  private logData(logLevel: LogLevel, message: string): Observable<any> {
    let logModel: LoggerModel = new LoggerModel();
    logModel.logLevel = logLevel;
    logModel.logMessage = message;
    return this.httpHelper.post(CoreUrl.api.logDataUrl, logModel);
  }

  //#endregion private functions

}
