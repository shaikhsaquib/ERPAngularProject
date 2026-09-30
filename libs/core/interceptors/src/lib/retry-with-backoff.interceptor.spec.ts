import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { retryWithBackoffInterceptor } from './retry-with-backoff.interceptor';

describe('retryWithBackoffInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([retryWithBackoffInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('retries a GET request on a 503 and succeeds once the server recovers', fakeAsync(() => {
    let result: unknown;
    http.get('/api/employees').subscribe((body) => (result = body));

    httpMock.expectOne('/api/employees').flush({}, { status: 503, statusText: 'Unavailable' });
    tick(1000); // covers the exponential backoff delay before the retry re-fires

    httpMock.expectOne('/api/employees').flush({ ok: true });
    tick();

    expect(result).toEqual({ ok: true });
  }));

  it('does not retry a mutating request', (done) => {
    http.post('/api/employees', {}).subscribe({
      error: () => done(),
    });

    httpMock.expectOne('/api/employees').flush({}, { status: 503, statusText: 'Unavailable' });
  });
});
