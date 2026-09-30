import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { StepDescriptor } from './step-descriptor.interface';

/**
 * Horizontal step/progress header. Owns only the header UI — step body
 * content is the consuming feature's responsibility. Only completed steps
 * are clickable; there is no jumping ahead to upcoming steps.
 */
@Component({
  selector: 'tsn-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @Input() steps: readonly StepDescriptor[] = [];
  @Output() readonly stepSelected = new EventEmitter<number>();

  onStepClick(index: number, step: StepDescriptor): void {
    if (step.state === 'complete') {
      this.stepSelected.emit(index);
    }
  }

  trackByIndex = (index: number): number => index;
}
