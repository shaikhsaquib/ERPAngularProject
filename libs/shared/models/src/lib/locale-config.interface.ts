/** Single source of truth consumed by the centralized currency/date/number i18n pipes. */
export interface LocaleConfig {
  locale: string;
  currencyCode: string;
  timeZone: string;
  dateFormat: string;
  dateTimeFormat: string;
}
