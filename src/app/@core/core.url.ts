//#region angular imports
//#endregion angular imports

//#region core imports

import { environment } from '../../environments/environment';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

export class CoreUrl {

  //#region properties

  public static readonly api = class {
    public static readonly appConfigUrl: string = '';//CoreUrl.getApiUrl('');
    public static readonly logDataUrl: string = '';//CoreUrl.getApiUrl('');
  }

  public static readonly page = class {
    public static readonly loginUrl: string = 'login';
    public static readonly errorUrl: string = 'error';
  }

  //#endregion properties

  //#region private methods

  //gets Api service url
  private static getApiUrl(address: string): string {
    return `${environment.apiBaseUrl}${address}`;
  }

  /**
   * gets site url
   * @param address
   */
  private static getSiteUrl(address: string): string {
    return `${environment.siteBaseUrl}${address}`;
  }
  //#endregion private methods

}
