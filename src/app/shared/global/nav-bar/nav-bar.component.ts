//#region angular imports

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

//#endregion angular imports

//#region core imports

//#endregion core imports

//#region functional/model imports

import { NavBarService } from './nav-bar.service';

//#endregion functional/model imports

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss']
})
export class NavBarComponent {

  //#region input properties

  @Input() show: boolean = true;

  //#endregion input properties

  //#region model properties

  //#endregion model properties

  //#region constructor

  constructor(private service: NavBarService, private router: Router) {
  }

  //#endregion constructor

  //#region component events

  ngOnInit() {
  }

  //#endregion component events

  //#region public functions/events assoaciated with UI elements

  //#endregion public functions/events assoaciated with UI elements

  //#region private functions

  //#endregion private functions

}
