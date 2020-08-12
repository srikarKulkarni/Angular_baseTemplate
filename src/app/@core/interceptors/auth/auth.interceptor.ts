//#region angular imports
import { HttpRequest, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { AuthService } from '@core/services';
import { StringHelper } from '@core/helper';
import { CoreUrl } from '@core/core.url';
import { CoreConstant } from '@core/core.constant';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  //#region model properties
  //#endregion model properties

  //#region constructor

  constructor(@Inject(Injector) private injector: Injector) {
  }

  //#endregion constructor

  //#region readonly properties

  private get authService(): AuthService {
    return this.injector.get(AuthService);
  }

  //#endregion readonly properties

  //#region public functions

  /**
   * overridden base implementation
   * @param req
   * @param next
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      headers: this.addHeader(req)
    }))
  }

  //#endregion public functions

  //#region private functions

  /**
   * adds auth token header to http request
   * @param req
   */
  private addHeader(req: HttpRequest<any>) {
    let headers: HttpHeaders = req.headers;
    if (req.url !== CoreUrl.page.loginUrl) {
      let token = this.authService.getAuthToken();
      // For each Request
      return headers.set(CoreConstant.header.authTokenName,
        StringHelper.format(CoreConstant.header.authTokenValue, token));
    }
  }

  //#endregion private functions

}
