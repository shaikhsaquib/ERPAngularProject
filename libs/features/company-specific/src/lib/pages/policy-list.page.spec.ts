import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PermissionService } from '@timescapenu/core-permissions';
import type { PagedResult } from '@timescapenu/shared-models';
import { PolicyListPageComponent } from './policy-list.page';
import { PolicyDocumentService } from '../services/policy-document.service';
import type { PolicyDocument } from '../models/policy-document.interface';

describe('PolicyListPageComponent', () => {
  let fixture: ComponentFixture<PolicyListPageComponent>;
  let component: PolicyListPageComponent;
  let policyDocumentServiceMock: { list: jest.Mock };
  let permissionService: PermissionService;

  const policies: readonly PolicyDocument[] = [
    {
      id: 'pd-1',
      title: 'Remote work policy',
      category: 'HR',
      effectiveDate: '2026-01-01',
      status: 'approved',
    },
  ];

  beforeEach(async () => {
    policyDocumentServiceMock = { list: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [PolicyListPageComponent],
      providers: [{ provide: PolicyDocumentService, useValue: policyDocumentServiceMock }],
    }).compileComponents();

    permissionService = TestBed.inject(PermissionService);
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(PolicyListPageComponent);
    component = fixture.componentInstance;
  }

  it('loads policy documents and updates rows/totalCount/loading signals when permitted', () => {
    permissionService.setContext({ capabilities: new Set(['company-specific.policy.view']) });
    const pagedResult: PagedResult<PolicyDocument> = {
      items: policies,
      totalCount: 1,
      page: 1,
      pageSize: 10,
    };
    policyDocumentServiceMock.list.mockReturnValue(of(pagedResult));

    createComponent();
    fixture.detectChanges();

    expect(policyDocumentServiceMock.list).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      sort: undefined,
    });
    expect(component.rows()).toEqual(policies);
    expect(component.totalCount()).toBe(1);
    expect(component.loading()).toBe(false);
  });

  it('sets selectedPolicy when a row is clicked', () => {
    permissionService.setContext({ capabilities: new Set(['company-specific.policy.view']) });
    policyDocumentServiceMock.list.mockReturnValue(
      of({
        items: policies,
        totalCount: 1,
        page: 1,
        pageSize: 10,
      } satisfies PagedResult<PolicyDocument>),
    );

    createComponent();
    fixture.detectChanges();

    expect(component.selectedPolicy()).toBeNull();

    component.onRowClick(policies[0]);

    expect(component.selectedPolicy()).toEqual(policies[0]);
  });

  it('hides the data table and shows the restricted empty state without the view capability', () => {
    permissionService.setContext({ capabilities: new Set() });
    policyDocumentServiceMock.list.mockReturnValue(
      of({ items: [], totalCount: 0, page: 1, pageSize: 10 } satisfies PagedResult<PolicyDocument>),
    );

    createComponent();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tsn-data-table')).toBeNull();
    expect(compiled.textContent).toContain('Access restricted');
  });
});
