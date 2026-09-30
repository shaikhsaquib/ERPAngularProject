import { TestBed } from '@angular/core/testing';
import { PermissionService } from './permission.service';

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionService);
  });

  it('denies everything before a context is set', () => {
    expect(service.has('ess.payslip.view')).toBe(false);
  });

  it('grants a capability once set on the context', () => {
    service.setContext({ capabilities: new Set(['ess.payslip.view']) });
    expect(service.has('ess.payslip.view')).toBe(true);
    expect(service.has('mss.approval.approve')).toBe(false);
  });

  it('hasAny / hasAll evaluate across a capability list', () => {
    service.setContext({ capabilities: new Set(['ess.payslip.view', 'ess.tax.view']) });
    expect(service.hasAny(['ess.payslip.view', 'mss.approval.approve'])).toBe(true);
    expect(service.hasAll(['ess.payslip.view', 'mss.approval.approve'])).toBe(false);
    expect(service.hasAll(['ess.payslip.view', 'ess.tax.view'])).toBe(true);
  });

  it('clear() resets the context', () => {
    service.setContext({ capabilities: new Set(['ess.payslip.view']) });
    service.clear();
    expect(service.has('ess.payslip.view')).toBe(false);
  });
});
