import { DatePipe } from '@angular/common';
import { Pipe, type PipeTransform, inject } from '@angular/core';
import { LOCALE_CONFIG } from './locale-config.token';

export type DateVariant = 'date' | 'dateTime';

/** Formats a date using the single shared locale config — never format a date by hand. */
@Pipe({ name: 'tsnDate', standalone: true, pure: true })
export class TsnDatePipe implements PipeTransform {
  private readonly config = inject(LOCALE_CONFIG);

  transform(
    value: string | number | Date | null | undefined,
    variant: DateVariant = 'date',
  ): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    const format = variant === 'dateTime' ? this.config.dateTimeFormat : this.config.dateFormat;
    return new DatePipe(this.config.locale).transform(value, format, this.config.timeZone) ?? '';
  }
}
