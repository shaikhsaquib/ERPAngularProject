import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, IconComponent } from '@timescapenu/shared-ui';
import { NotificationsStore, SessionStore } from '@timescapenu/core-state';
import type { ModuleLink } from './module-link.interface';

/**
 * The persistent top bar identifying which of the 8 business modules the
 * user is currently in, plus the global notification bell and user menu
 * triggers. This component intentionally stays "thin": it does not own the
 * notification list or user menu dropdown panels themselves, only the
 * buttons that open them — the shell wires `notificationsClicked` /
 * `userMenuClicked` up to whatever overlay renders those panels.
 */
@Component({
  selector: 'tsn-module-bar',
  standalone: true,
  imports: [CommonModule, IconComponent, BadgeComponent],
  templateUrl: './module-bar.component.html',
  styleUrl: './module-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleBarComponent {
  @Input() modules: readonly ModuleLink[] = [];
  @Input() activeModuleId: string | null = null;

  @Output() moduleSelected = new EventEmitter<string>();
  @Output() notificationsClicked = new EventEmitter<void>();
  @Output() userMenuClicked = new EventEmitter<void>();

  protected readonly sessionStore = inject(SessionStore);
  protected readonly notificationsStore = inject(NotificationsStore);

  protected onModuleClick(moduleId: string): void {
    this.moduleSelected.emit(moduleId);
  }

  protected onNotificationsClick(): void {
    this.notificationsClicked.emit();
  }

  protected onUserMenuClick(): void {
    this.userMenuClicked.emit();
  }
}
