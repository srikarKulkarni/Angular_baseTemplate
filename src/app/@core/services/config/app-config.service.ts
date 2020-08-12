//#region angular imports

import { Injectable } from '@angular/core';

//#endregion angular imports

//#region core imports

import { AppConfigModel } from '@core/models';
import { HttpHelper} from '@core/helper';
import { CoreUrl } from '@core/core.url';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

@Injectable()

export class AppConfigService {

  //#region model properties

  private appConfigData: AppConfigModel

  //#endregion model properties

  //#region constructor

  constructor(private httpHelper: HttpHelper) {
    this.appConfigData = new AppConfigModel();
    this.setConfigData();
  }

  //#endregion constructor

  //#region public functions

  /**
   * gets configuration data
   */
  public getConfigData() {
    return this.appConfigData;
  }

  //#endregion public functions

  //#region private functions

  /**
   * sets app config model data
   */
  private setConfigData() {
    this.httpHelper.get(CoreUrl.api.appConfigUrl)
      .subscribe(
        (results: any) => {
          this.configDataMapper(results);
        });
  }

  /**
   * mapper for app config data
   * @param results
   */
  private configDataMapper(results) {

    //TODO: If model properties of server differ form client properties, use this place holder to map to the model
  }

  //#endregion private functions

}
