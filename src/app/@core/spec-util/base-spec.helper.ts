//#region angular imports

import { TestBed, TestBedStatic } from '@angular/core/testing';

//#endregion angular imports

//#region core imports
//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

export class BaseSpecHelper {

  //#region model properties

  //#endregion model properties

  //#region constructor

  constructor() {
  }

  //#endregion constructor

  //#region public functions

  /**
   * sets test bed
   * @param importArray
   * @param declarationArray
   * @param providerArray
   */
  public setTestBed(importArray: any[],
    declarationArray: any[],
    providerArray: any[] = []): TestBedStatic {
    return TestBed.configureTestingModule(
      {
        imports: importArray,
        declarations: declarationArray,
        providers: providerArray
      }
    );
  }

  /**
   * gets router spy for navigateByUl
   */
  public getRouterNavigateByUrlSpy() {
    return jasmine.createSpyObj('Router', ['navigateByUrl']);
  }

  //#endregion public functions

  //#region private functions

  //#endregion private functions
}
