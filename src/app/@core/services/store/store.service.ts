//#region angular imports

import { Injectable, Inject } from '@angular/core';

//#endregion angular imports

//#region core imports

import { CustomStorage } from '@core/storage';
import { StorageType } from '@core/enums';
import { CoreConstant } from '@core/core.constant';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

@Injectable()

export class StoreService {

  //#region model properties
  //#endregion model properties

  //#region constructor

  constructor(@Inject(CoreConstant.injectKey.globalStoreType) private globalStoreType: StorageType,
    private customStorage: CustomStorage) {
  }

  //#endregion constructor

  //#region public functions

  /**
   * sets data in storage
   * @param key
   * @param data
   * @param storeType - If specified, considers storage type from enum value else considers global storage
   */
  public setData(key: string, data: any, storeType: StorageType = StorageType.None): void {
    this.getStorage(storeType).setItem(key, JSON.stringify(data));
  }

  /**
   * Sets data to storage
   * @param key
   * @param data
   * @param storeType - If specified, considers storage type from enum value else considers global storage
   */
  public setDataWithoutJSON(key: string, data: any, storeType: StorageType = StorageType.None): void {
    this.getStorage(storeType).setItem(key, data);
  }

  /**
   * gets data from storage
   * @param key
   * @param storeType - If specified, considers storage type from enum value else considers global storage
   */
  public getData(key: string, storeType: StorageType = StorageType.None): any {
    return JSON.parse(this.getStorage(storeType).getItem(key));
  }

  /**
   * gets data from storage without json parsing
   * @param key
   * @param storeType - If specified, considers storage type from enum value else considers global storage
   */
  public getDataWithoutParse(key: string, storeType: StorageType = StorageType.None): any {
    return this.getStorage(storeType).getItem(key);
  }

  /**
   * deletes data from storage
   * @param key
   * @param storeType - If specified, considers storage type from enum value else considers global storage
   */
  public removeData(key: string, storeType: StorageType = StorageType.None): void {
    this.getStorage(storeType).removeItem(key);
  }

  //#endregion public functions

  //#region private functions
  /**
 * gets storage instance by type
 */
  private getStorage(storeType: StorageType): Storage {
    if (storeType == StorageType.None) {
      storeType = this.globalStoreType;
    }
    let storage: Storage = null;
    if (storeType) {
      switch (storeType) {
        case StorageType.Local:
          storage = localStorage;
          break;
        case StorageType.Session:
          storage = sessionStorage;
          break;
        case StorageType.Application:
          storage = this.customStorage;
          break;
      }
    }
    return storage;
  }
  //#endregion private functions

}
