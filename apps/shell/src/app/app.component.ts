import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '@timescapenu/core-auth';
import { CopilotContextStore, NotificationsStore, SessionStore } from '@timescapenu/core-state';
import type { Breadcrumb } from '@timescapenu/layout-breadcrumbs';
import { BreadcrumbsComponent } from '@timescapenu/layout-breadcrumbs';
import { CommandPaletteComponent } from '@timescapenu/layout-command-palette';
import { MegaMenuComponent } from '@timescapenu/layout-mega-menu';
import { ModuleBarComponent } from '@timescapenu/layout-module-bar';
import { SidebarComponent } from '@timescapenu/layout-sidebar';
import { CopilotPanelComponent } from '@timescapenu/copilot';
import { ButtonComponent } from '@timescapenu/shared-ui';
import { COMMANDS, MODULE_LINKS, SIDEBAR_ITEMS_BY_MODULE, megaMenuSectionsFor } from './nav-config';

/**
 * The shell composes the chrome (module bar, sidebar, breadcrumbs, mega
 * menu, command palette, Copilot panel) around a single `<router-outlet>`.
 * It owns navigation-derived UI state (active module, breadcrumbs) and the
 * shell-only bits (notifications/user-menu popovers, the command palette
 * keyboard shortcut) — everything else is delegated to libs/layout,
 * libs/copilot and the routed feature module.
 */
@Component({
  standalone: true,
  selector: 'tsn-root',
  imports: [
    RouterOutlet,
    ModuleBarComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    MegaMenuComponent,
    CommandPaletteComponent,
    CopilotPanelComponent,
    ButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  protected readonly sessionStore = inject(SessionStore);
  protected readonly notificationsStore = inject(NotificationsStore);
  protected readonly copilotContext = inject(CopilotContextStore);

  protected readonly modules = MODULE_LINKS;
  protected readonly commands = COMMANDS;

  protected readonly sidebarCollapsed = signal(false);
  protected readonly megaMenuOpen = signal(false);
  protected readonly commandPaletteOpen = signal(false);
  protected readonly notificationsOpen = signal(false);
  protected readonly userMenuOpen = signal(false);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly activeModuleId = computed<string | null>(() => {
    const segment = this.currentUrl().split('/').filter(Boolean)[0] ?? '';
    return this.modules.some((module) => module.id === segment) ? segment : null;
  });

  protected readonly sidebarItems = computed(
    () => SIDEBAR_ITEMS_BY_MODULE[this.activeModuleId() ?? ''] ?? [],
  );

  protected readonly megaMenuSections = computed(() => megaMenuSectionsFor(this.activeModuleId()));

  protected readonly breadcrumbs = computed<readonly Breadcrumb[]>(() => {
    const moduleId = this.activeModuleId();
    const module = this.modules.find((candidate) => candidate.id === moduleId);
    if (!module) {
      return [];
    }
    const segments = this.currentUrl().split('/').filter(Boolean);
    const hasChild = segments.length > 1;
    const crumbs: Breadcrumb[] = [{ label: module.label, route: hasChild ? module.route : null }];
    if (hasChild) {
      crumbs.push({ label: titleCase(segments[1]), route: null });
    }
    return crumbs;
  });

  @HostListener('document:keydown', ['$event'])
  protected onGlobalKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.commandPaletteOpen.set(true);
    }
  }

  protected onModuleSelected(moduleId: string): void {
    const module = this.modules.find((candidate) => candidate.id === moduleId);
    if (module) {
      this.router.navigateByUrl(module.route);
    }
    this.closeOverlays();
  }

  protected onSidebarItemSelected(route: string): void {
    this.router.navigateByUrl(route);
  }

  protected onBreadcrumbSelected(route: string): void {
    this.router.navigateByUrl(route);
  }

  protected onMegaMenuLinkSelected(route: string): void {
    this.router.navigateByUrl(route);
    this.megaMenuOpen.set(false);
  }

  protected onCommandSelected(commandId: string): void {
    this.router.navigateByUrl(commandId);
    this.commandPaletteOpen.set(false);
  }

  protected onNotificationClicked(notificationId: string): void {
    this.notificationsStore.markRead(notificationId);
  }

  protected onSignOut(): void {
    this.userMenuOpen.set(false);
    this.authService.logout();
  }

  private closeOverlays(): void {
    this.megaMenuOpen.set(false);
    this.notificationsOpen.set(false);
    this.userMenuOpen.set(false);
  }
}

function titleCase(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
