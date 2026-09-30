import { DecimalPipe } from '@angular/common';
import { Pipe, type PipeTransform, inject } from '@angular/core';
import { LOCALE_CONFIG } from './locale-config.token';

/** Formats a plain number using the single shared locale config — never format a number by hand. */
@Pipe({ name: 'tsnNumber', standalone: true, pure: true })
export class TsnNumberPipe implements PipeTransform {
  private readonly config = inject(LOCALE_CONFIG);

  transform(value: number | null | undefined, digitsInfo?: string): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return '';
    }
    return new DecimalPipe(this.config.locale).transform(value, digitsInfo) ?? '';
  }
}
