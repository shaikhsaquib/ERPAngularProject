import { Pipe, type PipeTransform, inject } from '@angular/core';
import { LOCALE_CONFIG } from './locale-config.token';

/** Formats a number as currency using the single shared locale config — never format currency by hand. */
@Pipe({ name: 'tsnCurrency', standalone: true, pure: true })
export class TsnCurrencyPipe implements PipeTransform {
  private readonly config = inject(LOCALE_CONFIG);

  transform(value: number | null | undefined, currencyCodeOverride?: string): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return '';
    }
    return new Intl.NumberFormat(this.config.locale, {
      style: 'currency',
      currency: currencyCodeOverride ?? this.config.currencyCode,
    }).format(value);
  }
}
