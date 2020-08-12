//#region angular imports
import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//#endregion angular imports

//#region core imports

import { AuthService } from '@core/services';
import { CoreUrl } from '@core/core.url';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model importss

@Injectable()
export class AuthGuardService implements CanActivate {

  //#region model properties
  //#endregion model properties

  //#region constructor

  constructor(private router: Router, private service: AuthService) {
  }

  //#endregion constructor

  //#region public functions

  /**
   * implementation gor can active interface method
   */
  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.service.isUserAuthenticated.pipe(
      map(val => {
        if (val === true) {
          return true;
        } else {
          this.router.navigateByUrl(CoreUrl.page.loginUrl);
          return false;
        }
      }),
      catchError((err) => {
        this.router.navigateByUrl(CoreUrl.page.loginUrl);
        return of(false);
      }));
  }

  //#endregion public functions

  //#region private functions
  //#endregion private functions

}
