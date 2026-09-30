import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import type { NormalizedApiError } from '@timescapenu/shared-models';
import { errorNormalizationInterceptor } from './error-normalization.interceptor';

describe('errorNormalizationInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorNormalizationInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('normalizes a 422 into a validation error with field errors', (done) => {
    http.post('/api/employees', {}).subscribe({
      error: (error: NormalizedApiError) => {
        expect(error.severity).toBe('validation');
        expect(error.status).toBe(422);
        expect(error.fieldErrors?.['email']).toBe('required');
        done();
      },
    });

    httpMock.expectOne('/api/employees').flush(
      {
        code: 'VALIDATION_FAILED',
        message: 'Invalid payload',
        fieldErrors: { email: 'required' },
      },
      { status: 422, statusText: 'Unprocessable Entity' },
    );
  });

  it('normalizes a 500 as a server-severity error', (done) => {
    http.get('/api/employees/1').subscribe({
      error: (error: NormalizedApiError) => {
        expect(error.severity).toBe('server');
        expect(error.status).toBe(500);
        done();
      },
    });

    httpMock.expectOne('/api/employees/1').flush({}, { status: 500, statusText: 'Server Error' });
  });
});
