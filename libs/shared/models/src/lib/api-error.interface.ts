export type ApiErrorSeverity = 'validation' | 'business' | 'auth' | 'server' | 'network';

/** Normalized shape every error passes through after core/interceptors' error-normalization interceptor. */
export interface NormalizedApiError {
  severity: ApiErrorSeverity;
  status: number;
  code: string;
  message: string;
  correlationId: string;
  fieldErrors?: Readonly<Record<string, string>>;
}
