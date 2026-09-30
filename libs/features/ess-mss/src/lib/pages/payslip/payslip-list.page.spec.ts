import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PermissionService } from '@timescapenu/core-permissions';
import type { PagedResult } from '@timescapenu/shared-models';
import { PayslipListPageComponent } from './payslip-list.page';
import { PayslipService } from '../../services/payslip.service';
import type { Payslip } from '../../models/payslip.interface';

describe('PayslipListPageComponent', () => {
  let fixture: ComponentFixture<PayslipListPageComponent>;
  let component: PayslipListPageComponent;
  let payslipServiceMock: { list: jest.Mock };
  let permissionService: PermissionService;

  const payslips: readonly Payslip[] = [
    {
      id: 'p-1',
      period: '2026-08',
      grossPay: 5000,
      netPay: 4200,
      currencyCode: 'USD',
      status: 'released',
    },
  ];

  beforeEach(async () => {
    payslipServiceMock = { list: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [PayslipListPageComponent],
      providers: [{ provide: PayslipService, useValue: payslipServiceMock }],
    }).compileComponents();

    permissionService = TestBed.inject(PermissionService);
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(PayslipListPageComponent);
    component = fixture.componentInstance;
  }

  it('loads payslips and updates rows/totalCount/loading signals when permitted', () => {
    permissionService.setContext({ capabilities: new Set(['ess-mss.payslip.view']) });
    const pagedResult: PagedResult<Payslip> = {
      items: payslips,
      totalCount: 1,
      page: 1,
      pageSize: 10,
    };
    payslipServiceMock.list.mockReturnValue(of(pagedResult));

    createComponent();
    fixture.detectChanges();

    expect(payslipServiceMock.list).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      sort: undefined,
    });
    expect(component.rows()).toEqual(payslips);
    expect(component.totalCount()).toBe(1);
    expect(component.loading()).toBe(false);
  });

  it('hides the data table and shows the restricted empty state without the view capability', () => {
    permissionService.setContext({ capabilities: new Set() });
    payslipServiceMock.list.mockReturnValue(
      of({ items: [], totalCount: 0, page: 1, pageSize: 10 } satisfies PagedResult<Payslip>),
    );

    createComponent();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('tsn-data-table')).toBeNull();
    expect(compiled.textContent).toContain('Access restricted');
  });
});
