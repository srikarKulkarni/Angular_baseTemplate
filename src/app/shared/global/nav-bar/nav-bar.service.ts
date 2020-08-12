//#region angular imports

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { HttpHelper } from '@core/helper';

//#endregion core imports

//#region functional/model imports

import { NavMenuModel } from '@app/shared/global/nav-bar/models/nav-menu.model';
import { MenuItemModel } from '@app/shared/global/nav-bar/models/menu-item.model';

//#endregion functional/model imports

@Injectable()

export class NavBarService {

  //#region model properties
  //#endregion model properties

  //#region constructor

  constructor(private httpHelper: HttpHelper ) {
  }

  //#endregion constructor

  //#region service calls

  /**
   * get navigation menu
   */
  public getNavMenu() {
    //return this.httpHelper.get(Url.api.navMenuUrl);

    let dataModel: NavMenuModel = new NavMenuModel();

    let parent1: MenuItemModel = new MenuItemModel();
    parent1.code = 'p1';
    parent1.displayText = 'Controls';
    parent1.url = '';

    let parent1Child1: MenuItemModel = new MenuItemModel();
    parent1Child1.code = 'p1c1';
    parent1Child1.displayText = 'Textbox';
    parent1Child1.url = '';
    let parent1Child2: MenuItemModel = new MenuItemModel();
    parent1Child2.code = 'p1c2';
    parent1Child2.displayText = 'Button';
    parent1Child2.url = '';
    let parent1Child3: MenuItemModel = new MenuItemModel();
    parent1Child3.code = 'p1c3';
    parent1Child3.displayText = 'Datepicker';
    parent1Child3.url = '';

    parent1.childNodes = [];
    parent1.childNodes.push(parent1Child1);
    parent1.childNodes.push(parent1Child2);
    parent1.childNodes.push(parent1Child3);


    let parent2: MenuItemModel = new MenuItemModel();
    parent2.code = 'p2';
    parent2.displayText = 'Components';
    parent2.url = '';

    let parent2Child1: MenuItemModel = new MenuItemModel();
    parent2Child1.code = 'p2c1';
    parent2Child1.displayText = 'Nav Menu';
    parent2Child1.url = '';
    let parent2Child2: MenuItemModel = new MenuItemModel();
    parent2Child2.code = 'p2c2';
    parent2Child2.displayText = 'Home';
    parent2Child2.url = '';
    let parent2Child3: MenuItemModel = new MenuItemModel();
    parent2Child3.code = 'p2c3';
    parent2Child3.displayText = 'Form';
    parent2Child3.url = '';

    parent2.childNodes = [];
    parent2.childNodes.push(parent2Child1);
    parent2.childNodes.push(parent2Child2);
    parent2.childNodes.push(parent2Child3);

    let parent3: MenuItemModel = new MenuItemModel();
    parent3.code = 'p3';
    parent3.displayText = 'Testing';
    parent3.url = '';

    dataModel.menuList = [];
    dataModel.menuList.push(parent1);
    dataModel.menuList.push(parent2);
    dataModel.menuList.push(parent3);

    let observable = Observable.create(observer => {
      observer.next(dataModel);
      observer.complete();//to show we are done with our processing
    })

    return observable;
  }

  //#endregion service calls

  //#region private functions
  //#endregion private functions

}
