//#region angular imports

import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { LoggerModel } from '@core/models/logger.model';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

export class ErrorModel {

  //#region model properties

  /** error message */
  public errorMessage: string;

  /** error response status code */
  public statusCode: number;

  /** flag for notifying application of the global error */
  public canNotify: boolean;

  /** observable for error log api response*/
  public errorLogResponse: Observable<LoggerModel>;

  //#endregion model properties

  //#region constructor

  constructor() {
    this.errorLogResponse = new Observable<LoggerModel>(null);
  }

  //#endregion constructor

}
