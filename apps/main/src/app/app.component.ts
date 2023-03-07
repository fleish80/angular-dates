import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'angular-dates-root',
  template: `

      <nav class="nav">
          <a routerLink="/intl-date-time-format">intl-date-time-format</a>
      </nav>

      <router-outlet/>
  `,
  styles: [``],
  imports: [
    RouterOutlet,
    RouterLink
  ],
  standalone: true
})
export class AppComponent {
  title = 'main';
}
