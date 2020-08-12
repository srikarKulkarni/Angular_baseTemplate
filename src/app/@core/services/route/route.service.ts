//#region angular imports

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//#endregion angular imports

//#region core imports

import { CoreConstant } from '@core/core.constant';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

@Injectable()

export class RouteService {

  //#region model properties
  //#endregion model properties

  //#region constructor

  constructor(private router: Router) {
  }

  //#endregion constructor

  //#region public functions

  /**
   * Redirects to given url within same module
   * @param urlPath
   */
  public redirect(urlPath: string): void {
    this.router.navigateByUrl(urlPath);
  }

  /**
   * redirects to different module
   * @param urlPath
   */
  public redirectToDifferentApp(urlPath: string): void {
    window.location.href = urlPath;
  }

  /**
   * verifies if given string is present in Url
   * @param key
   */
  public hasKeyInUrl(key: string): boolean {
    if (key) {
      let currentLocation = this.getCurrentUrl();
      if (currentLocation.toLowerCase().indexOf(key.toLowerCase()) > -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * Verifies and gets the value of given string if present in Url
   * @param key
   */
  public getValueFromUrl(key: string): string {
    if (this.hasKeyInUrl(key)) {
      var currentLocation = this.getCurrentUrl();
      return currentLocation.match(`${key}${CoreConstant.searchPattern.queryParam}`)[1];
    }
    return '';
  }

  /**
   * gets current url
   */
  public getCurrentUrl(): string {
    return window.location.href;
  }

  /**
   * gets current route
   */
  public getCurrentRoute(): string {
    return this.router.url;
  }

  /**
   * determines if given url is current route
   * @param url
   */
  public isCurrentRoute(url: string): boolean {
    let currentRoute: string = this.getCurrentRoute();
    if (currentRoute.includes(url)) {
      return true;
    }
    return false;
  }

  //#endregion public functions

  //#region private functions
  //#endregion private functions

}
