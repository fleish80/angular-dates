import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter, Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'intl-date-time-format'
  },
  {
    path: 'intl-date-time-format',
    loadComponent: () => import('./app/intl-date-time-format.component').then(c => c.IntlDateTimeFormatComponent),
    title: 'Intl Date Time Format',
  },
];


bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)]
}).catch((err) => console.error(err));
