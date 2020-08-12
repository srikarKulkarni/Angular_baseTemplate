//#region angular imports
//#endregion angular imports

//#region core imports

import { ErrorComponent } from '@shared/global';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

export const routeConfig =
  [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
    },
    { path: 'error', component: ErrorComponent },
    //This should be at the bottom only
    { path: '**', redirectTo: '/error' }
  ]
