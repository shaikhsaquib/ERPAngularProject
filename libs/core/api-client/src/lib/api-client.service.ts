import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PagedResult, QueryParams } from '@timescapenu/shared-models';
import { API_BASE_URL } from './api-base-url.token';
import type { ApiRequestOptions } from './api-request-options.interface';

/**
 * The only sanctioned way to talk to the backend. Nothing outside this lib
 * may inject HttpClient directly — that keeps JWT attachment, correlation
 * IDs, retry/backoff, error normalization and audit logging (all wired as
 * HttpInterceptorFn in core/interceptors) applied uniformly to every call.
 */
@Injectable({ providedIn: 'root' })
export class ApiClientService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  get<T>(path: string, options?: ApiRequestOptions): Observable<T> {
    return this.http.get<T>(this.url(path), this.toHttpOptions(options));
  }

  post<T, B = unknown>(path: string, body: B, options?: ApiRequestOptions): Observable<T> {
    return this.http.post<T>(this.url(path), body, this.toHttpOptions(options));
  }

  put<T, B = unknown>(path: string, body: B, options?: ApiRequestOptions): Observable<T> {
    return this.http.put<T>(this.url(path), body, this.toHttpOptions(options));
  }

  patch<T, B = unknown>(path: string, body: B, options?: ApiRequestOptions): Observable<T> {
    return this.http.patch<T>(this.url(path), body, this.toHttpOptions(options));
  }

  delete<T>(path: string, options?: ApiRequestOptions): Observable<T> {
    return this.http.delete<T>(this.url(path), this.toHttpOptions(options));
  }

  /** Server-side paged/sorted/filtered list — the shape shared/patterns' data-table expects. */
  getPaged<T>(
    path: string,
    query: QueryParams,
    options?: ApiRequestOptions,
  ): Observable<PagedResult<T>> {
    return this.http.get<PagedResult<T>>(this.url(path), {
      ...this.toHttpOptions(options),
      params: this.queryToHttpParams(query, options?.params),
    });
  }

  private url(path: string): string {
    return /^https?:\/\//.test(path) ? path : `${this.baseUrl}/${path.replace(/^\//, '')}`;
  }

  private toHttpOptions(options?: ApiRequestOptions) {
    return {
      params: this.toHttpParams(options?.params),
      headers: options?.headers ? new HttpHeaders(options.headers) : undefined,
    };
  }

  private toHttpParams(params?: Readonly<Record<string, string | number | boolean>>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) {
      return httpParams;
    }
    for (const [key, value] of Object.entries(params)) {
      httpParams = httpParams.set(key, String(value));
    }
    return httpParams;
  }

  private queryToHttpParams(
    query: QueryParams,
    extra?: Readonly<Record<string, string | number | boolean>>,
  ): HttpParams {
    let httpParams = this.toHttpParams(extra)
      .set('page', String(query.page))
      .set('pageSize', String(query.pageSize));

    if (query.search) {
      httpParams = httpParams.set('search', query.search);
    }
    query.sort?.forEach((descriptor, index) => {
      httpParams = httpParams
        .set(`sort[${index}].field`, descriptor.field)
        .set(`sort[${index}].direction`, descriptor.direction);
    });
    query.filters?.forEach((descriptor, index) => {
      httpParams = httpParams
        .set(`filters[${index}].field`, descriptor.field)
        .set(`filters[${index}].operator`, descriptor.operator)
        .set(`filters[${index}].value`, String(descriptor.value));
    });
    return httpParams;
  }
}
