export class Constant {

  //#region tokens

  public static readonly token = class {
    public static readonly questionMark: string = '?';
    public static readonly dot: string = '.';
    public static readonly hyphen: string = '-';
    public static readonly slash: string = '/';
    public static readonly space: string = ' ';
    public static readonly percentile: string = '%';
  }

  //#endregion tokens

  //#region loader

  public static readonly loader = class {
    public static readonly progressElement = 'progress';
    public static readonly fullPercentile = '100%';
  }

  //#endregion loader

  //#region font awesome classes

  public static readonly font = class {
    public static readonly caret_down: string = 'fa fa-caret-down';
    public static readonly caret_up: string = 'fa fa-caret-up';
    public static readonly caret_right: string = 'fa fa-caret-right';
    public static readonly caret_left: string = 'fa fa-caret-left';
  }

  //#endregion font awesome classes

  //#region css classes

  public static readonly cssClass = class {
    public static readonly nav_li_dropdown: string = 'nav-item dropdown';
    public static readonly nav_li_item: string = 'nav-item';
    public static readonly nav_li_active: string = 'active';
  }

  //#endregion css classes

  //#region application global event codes

  public static readonly eventCode = class {
    public static readonly navToggle: string = 'toggle_nav';
    public static readonly menuIconToggle: string = 'toggle_menu_icon';
  }

  //#endregion application global event codes
  
}
