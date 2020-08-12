//#region angular imports

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

//#endregion angular imports

//#region core imports

import { GlobalErrorService, GlobalEventManagerService, LoggerModel, ErrorModel } from '@app/@core';

//#endregion core imports

//#region functional/model imports

import { Constant } from '@app/shared/utilities';

//#endregion functional/model imports

@Component({
  selector: 'app-error',
  templateUrl: './error.html'
})
export class ErrorComponent {

  //#region model properties

  public referenceNumber: string;
  public errorModel: ErrorModel;

  private logSubscription: Subscription;

  //#endregion model properties

  //#region constructor

  constructor(private service: GlobalErrorService, private eventService: GlobalEventManagerService) {
    this.errorModel = new ErrorModel();
  }

  //#endregion constructor

  //#region component events

  ngOnInit() {
    this.errorModel = this.service.getErrorInfo();
    this.eventService.notifyEvent(Constant.eventCode.menuIconToggle, false);
    this.logSubscription = this.service.getErrorInfo().errorLogResponse.subscribe((res: LoggerModel) => {
      this.referenceNumber = res.referenceNumber;
    });
  }

  ngOnDestroy() {
    this.service.clearErrorState();
    this.logSubscription.unsubscribe();
    this.eventService.notifyEvent(Constant.eventCode.menuIconToggle, true);
  }

  //#endregion component events

  //#region service calls
  //#endregion service calls

  //#region public functions/events assoaciated with UI elements
  //#endregion public functions/events assoaciated with UI elements

  //#region private functions
  //#endregion private functions

}
