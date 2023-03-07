import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter, Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  {
    path: 'intl-date-time-format',
    loadComponent: () => import('./app/intl-date-time-format.component').then(c => c.IntlDateTimeFormatComponent),
    title: 'User',
  },
];


bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)]
}).catch((err) => console.error(err));
