import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiClientService } from './api-client.service';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('prefixes relative paths with the configured base URL', () => {
    service.get('employees/1').subscribe();
    const req = httpMock.expectOne('/api/employees/1');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('serializes QueryParams for getPaged', () => {
    service
      .getPaged('employees', {
        page: 2,
        pageSize: 25,
        search: 'jane',
        sort: [{ field: 'name', direction: 'asc' }],
        filters: [{ field: 'department', operator: 'eq', value: 'Finance' }],
      })
      .subscribe();

    const req = httpMock.expectOne(
      (r) =>
        r.url === '/api/employees' &&
        r.params.get('page') === '2' &&
        r.params.get('pageSize') === '25' &&
        r.params.get('search') === 'jane' &&
        r.params.get('sort[0].field') === 'name' &&
        r.params.get('filters[0].value') === 'Finance',
    );
    req.flush({ items: [], totalCount: 0, page: 2, pageSize: 25 });
  });
});
