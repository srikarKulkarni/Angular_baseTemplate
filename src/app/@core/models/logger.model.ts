//#region angular imports
//#endregion angular imports

//#region core imports

import { LogLevel } from '@core/enums';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

export class LoggerModel {

  //#region model properties

  public logLevel: LogLevel;
  public logMessage: string;
  public referenceNumber: string;

  //#endregion model properties

  //#region constructor

  constructor() {
  }

  //#endregion constructor

}
