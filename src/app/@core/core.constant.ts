export class CoreConstant {

  //#region tokens

  public static readonly token = class {
    public static readonly questionMark: string = '?';
    public static readonly dot: string = '.';
    public static readonly hyphen: string = '-';
    public static readonly slash: string = '/';
    public static readonly space: string = ' ';
  }

  //#endregion tokens

  //#region storage keys

  public static readonly storageKey = class {
    public static readonly authToken: string = '';
  }

  //#endregion storage keys

  //#region auth keys

  public static readonly header = class {
    public static readonly authTokenName: string = 'Authorization';
    public static readonly authTokenValue: string = 'Bearer  {0}';
    public static readonly contentTypeName: string = 'Content-Type';
    public static readonly jsonContentType: string = 'application/json';
  }

  //#endregion auth keys

  //#region http status codes

  public static readonly statusCode = class {
    public static readonly unAuthenticated: number = 401;
    public static readonly unAuthorized: number = 403;
    public static readonly serverError: number = 500;
    public static readonly fileNotFound: number = 404;
    public static readonly badRequest: number = 400;
  }

  //#endregion http status codes

  //#region log messages

  public static readonly logMessage = class {
    public static readonly clientApiError: string = 'Error: {0}';
    public static readonly serverApiError: string = 'Error Code: {0} \nMessage: {1}';
  }

  //#endegion log messages

  //#region search patterns

  public static readonly searchPattern = class {
    public static readonly queryParam: string = '=([^&]*)';
  }

  //#endregion search patterns

  //#region inject keys

  public static readonly injectKey = class {
    public static readonly globalStoreType: string = 'globalStoreType';
  }

  //#endregion inject keys

  //#region values

  public static readonly trueVal: string = 'true';
  public static readonly falseVal: string = 'false';
  public static readonly bitTrueVal: string = '1';
  public static readonly bitFalseVal: string = '0';
  public static readonly yesTrueVal: string = 'yes';
  public static readonly noFalseVal: string = 'no';

  //#endregion values


}
