//#region angular imports

import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from "@angular/router";
import { Subscription } from 'rxjs';

//#endregion angular imports

//#region core imports

import { GlobalErrorService, LoaderService, GlobalEventManagerService, RouteService, CoreUrl } from '@app/@core';

//#endregion core imports

//#region functional/model imports

import { Constant, Url } from '@shared/utilities';

//#endregion functional/model imports

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {

  //#region model properties

  public navMenuColWidth: number = 3;
  public showNavBar: boolean = true;
  public isError: boolean = false;

  private errorSubscription: Subscription;

  //#endregion model properties

  //#region constructor

  constructor(private router: Router,
    private loadingBarService: LoaderService,
    private errorService: GlobalErrorService,
    private eventManager: GlobalEventManagerService,
    private routeService: RouteService) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.onNavigationStart();
      }
      else if (event instanceof NavigationEnd) {
        this.onNavigationEnd();
      }
      if (event instanceof NavigationCancel) {
        this.onNavigationCancel();
      }
      if (event instanceof NavigationError) {
        this.onNavigationError();
      }
    });
    this.eventManager.subscribeEventHandler(Constant.eventCode.navToggle, this.showNavCallBack.bind(this), this.showNavBar);
    this.errorSubscription = this.errorService.isGlobalError.subscribe((isError: boolean) => {
      //Implement logic to navigate to Error page or to show a Error message section as per requirement
      if (isError) {
        this.routeService.redirect(Url.page.errorUrl);
      }
    });
  }

  //#endregion constructor

  //#region component events

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.eventManager.unsubscribeEventHandler(Constant.eventCode.navToggle);
    this.errorSubscription.unsubscribe();
  }

  //#endregion component events

  //#region service calls
  //#endregion service calls

  //#region public functions/events assoaciated with UI elements

  //#region router event functions


  /**
   * on router navigation start event
   */
  public onNavigationStart() {
    this.loadingBarService.start();
  }

  /**
   * on router navigation end event
   */
  public onNavigationEnd() {
    this.loadingBarService.complete();
    if (this.routeService.isCurrentRoute(CoreUrl.page.errorUrl) || this.errorService.getGlobalErrorState()) {
      this.isError = true;
      this.eventManager.notifyEvent(Constant.eventCode.navToggle, false);
    }
  }

  /**
   * on router navigation cancel event
   */
  public onNavigationCancel() {
    this.loadingBarService.stop();
  }

  /**
   * on router navigation start event
   */
  public onNavigationError() {
    this.loadingBarService.stop();

  }

  //#endregion route event functions

  //#endregion public functions/events assoaciated with UI elements

  //#region private functions

  /**
   * call back for nav bar toggle event
   * @param val
   */
  private showNavCallBack(val: boolean) {
    let isError = this.errorService.getGlobalErrorState();
    this.navMenuColWidth = 0;
    this.showNavBar = false;
    if (!isError && !this.routeService.isCurrentRoute(CoreUrl.page.errorUrl)) {
      if (val) {
        this.navMenuColWidth = 3;
      }
      this.showNavBar = val;
    }
  }

  //#endregion private functions

}
