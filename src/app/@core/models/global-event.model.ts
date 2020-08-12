//#region angular imports

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

//#endregion angular imports

//#region core imports
//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

export class GlobalEventModel {

  //#region model properties

  public readonly eventCode: string;
  public callBack: Function;

  private eventValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private eventObservable: Observable<any>;
  private eventSubscription: Subscription;

  //#endregion model properties

  //#region constructor

  constructor(code: string) {
    this.eventCode = code;
    this.eventObservable = this.eventValue.asObservable();
  }

  //#endregion constructor

  //#region public functions

  /**
   * gets event value
   */
  public getCurrentValue() {
    return this.eventValue.getValue();
  }

  /**
   * sets event value
   * @param val
   */
  public setCurrentValue(val: any) {
    this.eventValue.next(val);
  }

  /**
   * subscribes to event
   */
  public subscribeEvent() {
    if ((!this.eventSubscription || this.eventSubscription.closed) && this.eventObservable) {
      this.eventSubscription = this.eventObservable.subscribe((val) => {
        if (this.callBack) {
          this.callBack(val);
        }
      });
    }
  }

  /**
   * unsubscribe event 
   */
  public unsubscribeEvent() {
    if (!this.eventSubscription.closed) {
      this.eventSubscription.unsubscribe();
    }
  }

  //#endregion public functions

}
