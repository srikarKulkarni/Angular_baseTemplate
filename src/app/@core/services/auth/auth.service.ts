//#region angular imports

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { UserModel } from '@core/models';
import { CoreConstant } from '@core/core.constant';

//#endregion core imports

//#region functional/model imports

import { StoreService } from '@core/services/store/store.service';

//#endregion functional/model imports

@Injectable()

export class AuthService {

  //#region model properties

  public isUserAuthenticated: Observable<boolean>;

  private userInfo: UserModel;
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //#endregion model properties

  //#region constructor

  constructor(private storageService: StoreService) {
    this.userInfo = new UserModel();
    this.isUserAuthenticated = this.isAuthenticated.asObservable();
  }

  //#endregion constructor

  //#region public functions

  /**
   * sets authentication status
   * @param isLoggedIn
   */
  public setAuthenticationStatus(isLoggedIn: boolean): void {
    this.isAuthenticated.next(isLoggedIn);
  }

  /**
   * handles login functionality
   * @param user
   * @param authToken
   */
  public onLoginHandler(user: UserModel, authToken: string) {
    //set token in storage
    this.storageService.setDataWithoutJSON(CoreConstant.storageKey.authToken, authToken);

    //set authentication status
    this.setAuthenticationStatus(true);

    //set user info
    this.setUserInfo(user);
  }

  /**
   * handles log out functionality
   */
  public onLogoutHandler() {
    //remove toke from storage
    this.storageService.removeData(CoreConstant.storageKey.authToken);

    //set suthentiation status
    this.setAuthenticationStatus(false);

    //reset user info
    this.resetUserInfo();
  }

  /**
   * gets auth token
   */
  public getAuthToken(): string {
    return this.storageService.getDataWithoutParse(CoreConstant.storageKey.authToken);
  }

  /**
   * gets authenticated user info
   */
  public getUserInfo(): UserModel {
    return this.userInfo;
  }

  //#endregion public functions

  //#region private functions

  /**
   * sets user info
   * @param user
   */
  private setUserInfo(user: UserModel): void {
    if (user) {
      this.userInfo.userName = user.userName;
      this.userInfo.email = user.email;

      this.userInfo.firstName = user.firstName;
      this.userInfo.lastName = user.lastName;
    }
  }

  /**
   * resets user info
   */
  private resetUserInfo(): void {
    this.userInfo = new UserModel();
  }

  //#endregion private functions

}
