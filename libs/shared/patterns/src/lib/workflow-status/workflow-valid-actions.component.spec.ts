import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkflowValidActionsComponent } from './workflow-valid-actions.component';
import { PermissionService } from '@timescapenu/core-permissions';
import {
  WORKFLOW_TRANSITIONS,
  type Capability,
  type WorkflowAction,
} from '@timescapenu/shared-models';

describe('WorkflowValidActionsComponent', () => {
  let fixture: ComponentFixture<WorkflowValidActionsComponent>;
  let component: WorkflowValidActionsComponent;
  let permissionService: PermissionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowValidActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowValidActionsComponent);
    component = fixture.componentInstance;
    permissionService = TestBed.inject(PermissionService);
  });

  function renderedLabels(): string[] {
    return Array.from(fixture.nativeElement.querySelectorAll('tsn-button')).map((el) =>
      (el as HTMLElement).textContent?.trim(),
    ) as string[];
  }

  it('exposes exactly the actions from WORKFLOW_TRANSITIONS for the given state', () => {
    component.state = 'submitted';
    fixture.detectChanges();

    expect(component.actions).toEqual(WORKFLOW_TRANSITIONS['submitted']);
  });

  it('renders one tsn-button per legal action, with no capability gate', () => {
    component.state = 'draft';
    fixture.detectChanges();

    expect(renderedLabels()).toEqual(['Submit', 'Edit']);
  });

  it('renders no buttons for a state with no legal actions', () => {
    component.state = 'approved';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('tsn-button').length).toBe(0);
  });

  it('emits actionSelected when a rendered action button is clicked', () => {
    component.state = 'draft';
    fixture.detectChanges();

    const emitted: WorkflowAction[] = [];
    component.actionSelected.subscribe((action) => emitted.push(action));

    const buttons: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('tsn-button');
    buttons[0].click();

    expect(emitted).toEqual(['submit']);
  });

  describe('capability gating', () => {
    const gatedCapability: Capability = 'mss.approval.approve';

    beforeEach(() => {
      component.state = 'submitted';
      component.actionCapability = (action) => (action === 'approve' ? gatedCapability : undefined);
    });

    it('hides only the gated action when the permission is not granted', () => {
      permissionService.setContext({ capabilities: new Set() });
      fixture.detectChanges();

      const labels = renderedLabels();
      expect(labels).not.toContain('Approve');
      expect(labels).toContain('Reject');
      expect(labels).toContain('Recall');
    });

    it('shows the gated action once the permission is granted', () => {
      permissionService.setContext({ capabilities: new Set([gatedCapability]) });
      fixture.detectChanges();

      expect(renderedLabels()).toContain('Approve');
    });
  });
});
