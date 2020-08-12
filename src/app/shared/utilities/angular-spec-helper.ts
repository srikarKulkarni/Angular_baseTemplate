//#region angular imports

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

//#endregion angular imports

//#region core imports

//#endregion core imports

//#region functional/model imports

//#endregion functional/model imports

export class AngularSpecHelper<T> {

  //#region model properties

  public component: T;
  public fixture: ComponentFixture<T>;

  //#endregion model properties

  //#region constructor

  constructor() {
  }

  //#endregion constructor

  //#region public functions

  /**
   * sets test base for angular controls
   * @param importArray
   * @param declarationArray
   * @param componentClass
   * @param field
   * @param providerArray
   */
  public setAngularTestBase(
    importArray: any[],
    declarationArray: any[],
    componentClass: any,
    providerArray: any[] = []) {
    this.setFixture(importArray, declarationArray, componentClass, providerArray);
    this.component = this.fixture.componentInstance;
    this.fixture.detectChanges();
  }

  //#endregion public functions

  //#region protected functions

  /**
   * sets fixture
   * @param importArray
   * @param declarationArray
   * @param componentClass
   * @param providerArray
   */
  protected setFixture(
    importArray: any[],
    declarationArray: any[],
    componentClass: any,
    providerArray: any[] = []): void {

    if (!importArray) {
      importArray = [];
    }
    importArray.push(CommonModule, BrowserModule, ReactiveFormsModule)

    if (!providerArray) {
      providerArray = [];
    }
    TestBed.configureTestingModule({
      imports: importArray,
      declarations: declarationArray,
    }).overrideComponent(componentClass, {
      set: {
        providers: providerArray
      }
    }
    ).compileComponents();

    this.fixture = TestBed.createComponent(componentClass);
  }

  //#endregion protected functions

  //#region private functions

  //#endregion private functions
}
