import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepperComponent } from './stepper.component';
import type { StepDescriptor } from './step-descriptor.interface';

describe('StepperComponent', () => {
  let fixture: ComponentFixture<StepperComponent>;
  let component: StepperComponent;

  const steps: readonly StepDescriptor[] = [
    { label: 'Details', state: 'complete' },
    { label: 'Review', state: 'active' },
    { label: 'Approval', state: 'upcoming' },
    { label: 'Payment', state: 'error' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    component.steps = steps;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits stepSelected when a completed step is clicked', () => {
    const emitted: number[] = [];
    component.stepSelected.subscribe((index) => emitted.push(index));

    component.onStepClick(0, steps[0]);

    expect(emitted).toEqual([0]);
  });

  it('does not emit stepSelected for an active, upcoming, or error step', () => {
    const emitted: number[] = [];
    component.stepSelected.subscribe((index) => emitted.push(index));

    component.onStepClick(1, steps[1]);
    component.onStepClick(2, steps[2]);
    component.onStepClick(3, steps[3]);

    expect(emitted).toEqual([]);
  });

  it('renders one marker button per step', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.tsn-stepper__marker');
    expect(buttons.length).toBe(steps.length);
  });

  it('only the completed step marker is enabled', () => {
    const buttons: NodeListOf<HTMLButtonElement> =
      fixture.nativeElement.querySelectorAll('.tsn-stepper__marker');
    expect(buttons[0].disabled).toBe(false);
    expect(buttons[1].disabled).toBe(true);
    expect(buttons[2].disabled).toBe(true);
    expect(buttons[3].disabled).toBe(true);
  });
});
