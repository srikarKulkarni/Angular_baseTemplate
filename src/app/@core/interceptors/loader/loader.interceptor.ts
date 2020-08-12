//#region angular imports
import { HttpRequest, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

//#endregion angular imports

//#region core imports

import { LoaderService } from '@core/services';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  //#region model properties
  //#endregion model properties

  //#region constructor

  constructor(@Inject(Injector) private injector: Injector) {
  }

  //#endregion constructor

  //#region readonly properties

  private get loaderService(): LoaderService {
    return this.injector.get(LoaderService);
  }

  //#endregion readonly properties

  //#region public functions

  /**
   * overridden base implementation
   * @param req
   * @param next
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.start();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.complete())
    );
  }

  //#endregion public functions

  //#region private functions
  //#endregion private functions

}
