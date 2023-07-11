import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'game',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@pong/home-page').then((m) => m.pongHomePageRoutes),
  },
  {
    path: 'game',
    loadChildren: () =>
      import('@pong/game-page').then((m) => m.pongGamePageRoutes),
  },
];
