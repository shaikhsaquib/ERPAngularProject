import { TestBed } from '@angular/core/testing';
import type { LocaleConfig } from '@timescapenu/shared-models';
import { LOCALE_CONFIG } from './locale-config.token';
import { TsnCurrencyPipe } from './tsn-currency.pipe';
import { TsnDatePipe } from './tsn-date.pipe';
import { TsnNumberPipe } from './tsn-number.pipe';

const config: LocaleConfig = {
  locale: 'en-US',
  currencyCode: 'USD',
  timeZone: 'UTC',
  dateFormat: 'MM/dd/yyyy',
  dateTimeFormat: 'MM/dd/yyyy HH:mm',
};

describe('i18n pipes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: LOCALE_CONFIG, useValue: config }] });
  });

  it('TsnCurrencyPipe formats using the shared locale config', () => {
    const pipe = TestBed.runInInjectionContext(() => new TsnCurrencyPipe());
    expect(pipe.transform(1234.5)).toBe('$1,234.50');
    expect(pipe.transform(null)).toBe('');
  });

  it('TsnDatePipe formats using the configured date format', () => {
    const pipe = TestBed.runInInjectionContext(() => new TsnDatePipe());
    expect(pipe.transform('2026-01-05T00:00:00Z')).toBe('01/05/2026');
  });

  it('TsnNumberPipe formats using the shared locale', () => {
    const pipe = TestBed.runInInjectionContext(() => new TsnNumberPipe());
    expect(pipe.transform(1234.5)).toBe('1,234.5');
  });
});
