export interface ApiRequestOptions {
  params?: Readonly<Record<string, string | number | boolean>>;
  headers?: Readonly<Record<string, string>>;
}
