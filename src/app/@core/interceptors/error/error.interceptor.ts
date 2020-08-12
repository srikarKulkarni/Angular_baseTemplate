//#region angular imports
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, retryWhen } from 'rxjs/operators';

//#endregion angular imports

//#region core imports

import { GlobalErrorService, AuthService, RouteService } from '@core/services';
import { ErrorModel } from '@core/models';
import { StringHelper } from '@core/helper';
import { CoreUrl } from '@core/core.url';
import { CoreConstant } from '@core/core.constant';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  //#region model properties
  //#endregion model properties

  //#region constructor

  constructor(@Inject(Injector) private injector: Injector) {
  }

  //#endregion constructor

  //#region readonly properties

  private get errorService(): GlobalErrorService {
    return this.injector.get(GlobalErrorService);
  }

  private get authService(): AuthService {
    return this.injector.get(AuthService);
  }

  private get routeService(): RouteService {
    return this.injector.get(RouteService);
  }

  //#endregion readonly properties

  //#region public functions

  /**
   * overridden base implementation
   * @param req
   * @param next
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      //retry(2),
      catchError((errorResponse: HttpErrorResponse) => {
        let errorInfo: ErrorModel = new ErrorModel;
        errorInfo.statusCode = errorResponse.status;

        if (errorResponse.error instanceof ErrorEvent) {
          // client-side error
          errorInfo.errorMessage = StringHelper.format(CoreConstant.logMessage.clientApiError, errorResponse.error.message);
        } else {
          // server-side error
          errorInfo.errorMessage = StringHelper.format(CoreConstant.logMessage.serverApiError, errorResponse.status, errorResponse.message);
        }
        //TODO:Handle error as per requirements
        let canRethrow: boolean = true;
        switch (errorInfo.statusCode) {
          case CoreConstant.statusCode.unAuthenticated:
            this.authService.onLogoutHandler();
            canRethrow = false;
            this.routeService.redirect(CoreUrl.page.loginUrl);
            break;
          case CoreConstant.statusCode.unAuthorized:
            break;
          case CoreConstant.statusCode.badRequest:
            break;
          case CoreConstant.statusCode.fileNotFound:
            this.errorService.onErrorHandler(errorInfo);
            canRethrow = false;
            this.routeService.redirect(CoreUrl.page.errorUrl);
            break;
          case CoreConstant.statusCode.serverError:
            break;
        }
        if (canRethrow) {
          return throwError(errorResponse);
        }
        else {
          return new Observable<HttpEvent<any>>();
        }
      })
    );
  }

  //#endregion public functions

  //#region private functions
  //#endregion private functions

}
