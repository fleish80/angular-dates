import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {startWith} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {TimeZoneEnum} from './timezone.enum';
import {JsonPipe, NgForOf} from '@angular/common';


export type DateFormat =
  'fullTz' | // Wednesday, Jun 15 2022, 12:41 PM (Asia/Jerusalem)
  'full' | // Wednesday, Jun 15 2022, 12:41 PM
  'monthYearTimeTz' | // Jun 15 2022, 12:46 PM (Asia/Jerusalem)
  'monthYearTime' | // Jun 15 2022, 12:46 PM
  'weekMonth' | // Wednesday, Jun 15
  'month' | //  Jun 15
  'timeTz' | // 12:47 PM (Asia/Jerusalem)
  'time'; // 12:47 PM


const predefinedFormats: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  full: {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long'
  },
  fullTz: {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    timeZoneName: 'short'
  },
  timeTz: {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  },
  time: {
    hour: '2-digit',
    minute: '2-digit'
  },
  monthYearTimeTz: {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  },
  monthYearTime: {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  },
  weekMonth: {
    month: 'short',
    day: '2-digit',
    weekday: 'long'
  },
  month: {
    month: 'short',
    day: '2-digit'
  }
};


@Component({
  selector: 'angular-dates-intl-date-time-format',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    JsonPipe
  ],
  template: `

    <select name="date-format" [formControl]="dateFormatCtrl">
      <option value="full">full</option>
      <option value="fullTz">fullTz</option>
      <option value="timeTz">timeTz</option>
      <option value="monthYearTimeTz">monthYearTimeTz</option>
      <option value="monthYearTime">monthYearTime</option>
      <option value="weekMonth">weekMonth</option>
    </select>

    <select name="language" [formControl]="languageCtrl">
      <option value="en-US">en-US</option>
      <option value="en-GB">en-GB</option>
      <option value="he-IL">he-IL</option>
      <option value="ru-RU">ru-RU</option>
    </select>


    <select name="timezone" [formControl]="timezoneCtrl">
      <option *ngFor="let timezoneKey of timezonesKeys" [value]="timezoneKey">{{timeZoneEnum[timezoneKey]}}</option>
    </select>


    {{date}}
  `,
  styles: []
})
export class IntlDateTimeFormatComponent {

  dateFormatCtrl = new FormControl<DateFormat>('full', {nonNullable: true});
  languageCtrl = new FormControl<string>('en-US', {nonNullable: true});
  timezoneCtrl = new FormControl<TimeZoneEnum>(TimeZoneEnum.UTC, {nonNullable: true});
  timeZoneEnum = TimeZoneEnum;

  timezonesKeys = Object.keys(TimeZoneEnum)
    .map((key) => key);

  date!: string;

  constructor() {
    combineLatest([
      this.dateFormatCtrl.valueChanges.pipe(startWith(this.dateFormatCtrl.value)),
      this.languageCtrl.valueChanges.pipe(startWith(this.languageCtrl.value)),
      this.timezoneCtrl.valueChanges.pipe(startWith(this.timezoneCtrl.value))
    ]).subscribe(([dateFormat, language, timezone]) => {
        const formats = {...predefinedFormats[dateFormat], timeZone: TimeZoneEnum[timezone]};
        this.date = new Intl.DateTimeFormat(language, formats).format(new Date());
      }
    )
  }
}
