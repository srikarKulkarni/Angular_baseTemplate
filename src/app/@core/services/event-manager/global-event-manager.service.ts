//#region angular imports

import { Injectable } from '@angular/core';

//#endregion angular imports

//#region core imports

import { GlobalEventModel } from '@core/models';

//#endregion core imports

//#region functional/model imports

//#endregion functional/model imports

@Injectable()
export class GlobalEventManagerService {

  //#region model properties

  private globalEvents: Array<GlobalEventModel> = new Array<GlobalEventModel>();

  //#endregion model properties

  //#region constructor

  constructor() {
  }

  //#endregion constructor

  //#region public functions

  /**
   * notifies event
   * @param eventCode
   * @param value
   */
  public notifyEvent(eventCode: string, value: any = null): void {
    if (this.globalEvents) {
      let index: number = this.globalEvents.findIndex(x => x.eventCode == eventCode);
      if (index > -1 && this.globalEvents[index].getCurrentValue() !== value) {
        this.globalEvents[index].setCurrentValue(value);
      }
    }
  }

  /**
   * sets handler for event change
   * @param eventCode
   * @param callbackFn
   * @param defaultValue
   */
  public subscribeEventHandler(eventCode: string, callbackFn: Function, defaultValue: any = null) {
    if (this.globalEvents) {
      let index: number = this.globalEvents.findIndex(x => x.eventCode == eventCode);

      if (index > -1) {
        this.setEventModel(this.globalEvents[index], callbackFn, defaultValue);
      }
      else {
        this.registerEvent(eventCode, callbackFn, defaultValue);
      }
    }
  }

  /**
   * removes event handler
   * @param eventCode
   */
  public unsubscribeEventHandler(eventCode: string) {
    let index: number = this.globalEvents.findIndex(x => x.eventCode == eventCode);
    if (index > -1) {
      this.globalEvents[index].unsubscribeEvent();
    }
  }

  /**
   * gets event value by code
   * @param eventCode
   */
  public getEventValue(eventCode: string): any {
    let index: number = this.globalEvents.findIndex(x => x.eventCode == eventCode);
    if (index > -1) {
      return this.globalEvents[index].getCurrentValue();
    }
  }

  //#endregion public functions

  //#region private functions

  /**
   * registers new event under global events
   * @param eventCode
   * @param callbackFn
   * @param value
   */
  private registerEvent(eventCode: string, callbackFn: Function, value: any = null) {
    let newGlobalEvent: GlobalEventModel = new GlobalEventModel(eventCode);
    this.setEventModel(newGlobalEvent, callbackFn, value);
    this.globalEvents.push(newGlobalEvent);
  }

  /**
   * sets event model values
   * @param model
   * @param callbackFn
   * @param value
   */
  private setEventModel(model: GlobalEventModel, callbackFn: Function, value: any = null) {
    model.setCurrentValue(value);
    model.callBack = callbackFn;
    model.subscribeEvent();
  }

  //#endregion private functions

}
