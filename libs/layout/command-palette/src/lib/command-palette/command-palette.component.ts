import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmptyStateComponent, ModalComponent } from '@timescapenu/shared-patterns';
import { InputComponent } from '@timescapenu/shared-ui';
import type { CommandGroup, CommandItem } from './command-item.interface';

/**
 * Cmd/Ctrl+K-style global search-and-jump. Filters `commands` client-side
 * by a case-insensitive substring match against `label`, groups the
 * results by `group`, and lets the user pick one with the mouse, Enter, or
 * the arrow keys.
 */
@Component({
  selector: 'tsn-command-palette',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, InputComponent, EmptyStateComponent],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPaletteComponent implements OnChanges {
  @Input() open = false;
  @Input() commands: readonly CommandItem[] = [];

  @Output() commandSelected = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  /** Public so the shell (and tests) can seed or clear the search term directly. */
  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  // `commands` arrives as a plain `@Input()`, not a signal — mirror it into one
  // (kept in sync from `ngOnChanges`) so the derived, grouped view below can be
  // a genuine `computed()` that reacts correctly under `OnPush`, however the
  // input or the search term changed.
  private readonly commandsSignal = signal<readonly CommandItem[]>([]);
  private readonly searchTerm = toSignal(this.searchControl.valueChanges, { initialValue: '' });

  protected readonly activeIndex = signal(0);

  protected readonly groupedCommands = computed<readonly CommandGroup[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const source = this.commandsSignal();
    const filtered = term
      ? source.filter((command) => command.label.toLowerCase().includes(term))
      : source;

    const order: string[] = [];
    const groups = new Map<string, CommandItem[]>();
    for (const command of filtered) {
      if (!groups.has(command.group)) {
        groups.set(command.group, []);
        order.push(command.group);
      }
      groups.get(command.group)?.push(command);
    }
    return order.map((group) => ({ group, items: groups.get(group) ?? [] }));
  });

  protected readonly flatCommands = computed<readonly CommandItem[]>(() =>
    this.groupedCommands().flatMap((group) => group.items),
  );

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.searchControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.activeIndex.set(0);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commands']) {
      this.commandsSignal.set(this.commands);
    }
    if (changes['open'] && this.open) {
      this.searchControl.setValue('', { emitEvent: false });
      this.activeIndex.set(0);
    }
  }

  protected isActive(command: CommandItem): boolean {
    return this.flatCommands()[this.activeIndex()]?.id === command.id;
  }

  protected onCommandClick(command: CommandItem): void {
    this.commandSelected.emit(command.id);
  }

  protected onClosed(): void {
    this.closed.emit();
  }

  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.open) {
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Enter':
        event.preventDefault();
        this.selectActive();
        break;
      case 'Escape':
        event.preventDefault();
        this.onClosed();
        break;
      default:
        break;
    }
  }

  private moveActive(delta: number): void {
    const count = this.flatCommands().length;
    if (count === 0) {
      return;
    }
    const next = (this.activeIndex() + delta + count) % count;
    this.activeIndex.set(next);
  }

  private selectActive(): void {
    const active = this.flatCommands()[this.activeIndex()];
    if (active) {
      this.commandSelected.emit(active.id);
    }
  }
}
