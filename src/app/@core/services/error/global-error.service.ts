//#region angular imports

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { ErrorModel } from '@core/models';

//#endregion core imports

//#region functional/model imports

import { LoggerService } from '@core/services/logger/logger.service';

//#endregion functional/model imports

@Injectable()

export class GlobalErrorService {
  //#region model properties

  public isGlobalError: Observable<boolean>;

  private errorInfo: ErrorModel;
  private isError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //#endregion model properties

  //#region constructor

  constructor(private loggerService: LoggerService) {
    this.errorInfo = new ErrorModel();
    this.isGlobalError = this.isError.asObservable();
  }

  //#endregion constructor

  //#region public functions
  
  /**
   * gets global error info
   */
  public getErrorInfo(): ErrorModel {
    return this.errorInfo;
  }

  /**
   * gets global error state
   */
  public getGlobalErrorState(): boolean {
    return this.isError.getValue();
  }

  /**
   * handles error functionality
   * @param error
   */
  public onErrorHandler(error: ErrorModel) {
    //Log error
    this.errorInfo.errorLogResponse = this.loggerService.logError(error.errorMessage);

    //set the error info
    this.setErrorInfo(error);
  }

  /**
   * clears error state
   */
  public clearErrorState() {
    //reset error info
    this.resetErrorInfo();
  }

  /**
   * notifies of a global error occurence
   * @param value
   */
  public notifyGlobalError(value: boolean): void {
    this.isError.next(value);
  }

  //#endregion public functions

  //#region private functions

  /**
   * sets user info
   * @param user
   */
  private setErrorInfo(error: ErrorModel): void {
    if (error) {
      this.errorInfo.errorMessage = error.errorMessage;
      this.errorInfo.statusCode = error.statusCode;
      this.errorInfo.canNotify = error.canNotify;
      this.notifyGlobalError(error.canNotify);
    }
  }

  /**
   * resets user info
   */
  private resetErrorInfo(): void {
    this.notifyGlobalError(false);
    this.errorInfo = new ErrorModel();
  }

  //#endregion private functions

}
