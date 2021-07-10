import {
  NgModule
} from '@angular/core';
import { CurrencyFormat } from './pipe-format-money.component';
import { NumberFormatPipe } from './number.pipe';
import { InfiniteScrollDirective } from './InfiniteScrollDirective.directive';
import { CurrencyFormatChina } from './pipe-china-money.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { FormatDateAdapter, APP_DATE_FORMATS } from './format-date.adapter';

@NgModule({
  imports: [

  ],
  declarations: [
    CurrencyFormat,
    NumberFormatPipe,
    InfiniteScrollDirective,
    CurrencyFormatChina,
  ],
  exports: [
    CurrencyFormat,
    NumberFormatPipe,
    InfiniteScrollDirective,
    CurrencyFormatChina,
  ],
  providers: [
    {
        provide: DateAdapter, useClass: FormatDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})

export class ShareCommonModule { }