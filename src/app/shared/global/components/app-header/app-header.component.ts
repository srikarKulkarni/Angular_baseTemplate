//#region angular imports

import { Component } from '@angular/core';

//#endregion angular imports

//#region core imports

import { GlobalEventManagerService } from '@app/@core';

//#endregion core imports

//#region functional/model imports

import { Constant } from '@shared/utilities';

//#endregion functional/model imports

@Component({
  selector: 'app-header',
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.scss']
})
export class AppHeaderComponent {

  //#region model properties

  public canShowNavBar: boolean = true;
  public showMenuIcon: boolean = true;

  //#endregion model properties

  //#region constructor

  constructor(private eventManager: GlobalEventManagerService) {
    this.eventManager.subscribeEventHandler(Constant.eventCode.menuIconToggle, this.canShowMenuIcon.bind(this));
  }

  //#endregion constructor

  //#region component events

  ngOnInit() {
  }

  ngOnDestroy() {
    this.eventManager.unsubscribeEventHandler(Constant.eventCode.menuIconToggle);
  }
  //#endregion component events

  //#region service calls
  //#endregion service calls

  //#region public functions/events assoaciated with UI elements

  /**
   * toggles nav bar display
   */
  public toggleNavBar(): void {
    let currentValue = this.eventManager.getEventValue(Constant.eventCode.navToggle);
    this.canShowNavBar = !currentValue;
    this.eventManager.notifyEvent(Constant.eventCode.navToggle, this.canShowNavBar);
  }

  //#endregion public functions/events assoaciated with UI elements

  //#region private functions

  /**
   * toggles menu icon display
   * @param val
   */
  private canShowMenuIcon(val: boolean): void {
    if (val != undefined && val != null) {
      this.showMenuIcon = val;
    }
    else {
      this.showMenuIcon = true;
    }
  }

  //#endregion private functions

}
