import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkflowStatusBadgeComponent } from './workflow-status-badge.component';
import type { WorkflowState } from '@timescapenu/shared-models';

describe('WorkflowStatusBadgeComponent', () => {
  let fixture: ComponentFixture<WorkflowStatusBadgeComponent>;
  let component: WorkflowStatusBadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowStatusBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowStatusBadgeComponent);
    component = fixture.componentInstance;
  });

  const cases: ReadonlyArray<readonly [WorkflowState, string, string]> = [
    ['draft', 'neutral', 'Draft'],
    ['submitted', 'info', 'Submitted'],
    ['approved', 'success', 'Approved'],
    ['rejected', 'danger', 'Rejected'],
    ['cancelled', 'neutral', 'Cancelled'],
  ];

  it.each(cases)('maps %s to tone %s and label %s', (state, tone, label) => {
    component.state = state;
    fixture.detectChanges();

    expect(component.tone).toBe(tone);
    expect(component.label).toBe(label);

    const badge: HTMLElement = fixture.nativeElement.querySelector('tsn-badge');
    expect(badge.textContent?.trim()).toBe(label);
  });
});
