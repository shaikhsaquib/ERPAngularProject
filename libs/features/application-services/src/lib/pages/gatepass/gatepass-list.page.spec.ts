import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { buildPagedResult } from '@timescapenu/testing';
import { PermissionService } from '@timescapenu/core-permissions';
import { GatepassService } from '../../services/gatepass.service';
import type { Gatepass } from '../../models/gatepass.interface';
import { GatepassListPageComponent } from './gatepass-list.page';

describe('GatepassListPageComponent', () => {
  let fixture: ComponentFixture<GatepassListPageComponent>;
  let component: GatepassListPageComponent;
  let permissionService: PermissionService;
  let gatepassServiceMock: { list: jest.Mock };

  const sampleGatepass: Gatepass = {
    id: 'gp-1',
    visitorName: 'Jane Doe',
    purpose: 'Vendor visit',
    status: 'submitted',
    validFrom: '2026-01-01',
    validTo: '2026-01-02',
  };

  beforeEach(async () => {
    gatepassServiceMock = {
      list: jest.fn().mockReturnValue(of(buildPagedResult([sampleGatepass]))),
    };

    await TestBed.configureTestingModule({
      imports: [GatepassListPageComponent],
      providers: [{ provide: GatepassService, useValue: gatepassServiceMock }],
    }).compileComponents();

    permissionService = TestBed.inject(PermissionService);
    fixture = TestBed.createComponent(GatepassListPageComponent);
    component = fixture.componentInstance;
  });

  it('loads gatepasses on init and populates rows/totalCount, clearing loading', () => {
    fixture.detectChanges();

    expect(gatepassServiceMock.list).toHaveBeenCalledWith({
      page: 1,
      pageSize: 20,
      sort: undefined,
    });
    expect(component['rows']()).toEqual([sampleGatepass]);
    expect(component['totalCount']()).toBe(1);
    expect(component['loading']()).toBe(false);
  });

  it('reloads with the new page on pageChange', () => {
    fixture.detectChanges();
    gatepassServiceMock.list.mockClear();

    component['onPageChange'](3);

    expect(gatepassServiceMock.list).toHaveBeenCalledWith({
      page: 3,
      pageSize: 20,
      sort: undefined,
    });
  });

  it('hides the "New Gatepass" button without the create capability', () => {
    permissionService.setContext({ capabilities: new Set(['application-services.gatepass.view']) });
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('tsn-button'));
    expect(button).toBeNull();
  });

  it('shows the "New Gatepass" button with the create capability', () => {
    permissionService.setContext({
      capabilities: new Set([
        'application-services.gatepass.view',
        'application-services.gatepass.create',
      ]),
    });
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('tsn-button'));
    expect(button).not.toBeNull();
  });

  it('shows the access-restricted empty state without the view capability', () => {
    permissionService.setContext({ capabilities: new Set() });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('tsn-data-table'))).toBeNull();
    expect(fixture.debugElement.query(By.css('tsn-empty-state'))).not.toBeNull();
  });

  it('sets the selected gatepass on row click', () => {
    fixture.detectChanges();

    component['onRowClick'](sampleGatepass);

    expect(component['selectedGatepass']()).toEqual(sampleGatepass);
  });
});
