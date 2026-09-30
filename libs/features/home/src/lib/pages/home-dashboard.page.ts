import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CopilotContextStore, SessionStore } from '@timescapenu/core-state';
import { BadgeComponent } from '@timescapenu/shared-ui';
import type { QuickLink } from '../models/quick-link.interface';

/**
 * The shell's landing page — a welcome banner plus a grid of quick links
 * into the other modules. Unlike every other page in the feature libs this
 * one never calls a backend: there is nothing module-specific to fetch here.
 */
@Component({
  selector: 'tsn-home-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent],
  templateUrl: './home-dashboard.page.html',
  styleUrl: './home-dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDashboardPageComponent implements OnInit {
  private readonly sessionStore = inject(SessionStore);
  private readonly copilotContextStore = inject(CopilotContextStore);

  readonly displayName = this.sessionStore.displayName;

  readonly quickLinks: readonly QuickLink[] = [
    { label: 'Gatepasses', route: '/application-services/gatepass' },
    { label: 'Personnel Action Requests', route: '/application-services/par' },
    { label: 'Registration', route: '/application-services/registration' },
    { label: 'Allowances', route: '/application-services/allowances' },
    { label: 'Audit Tracker', route: '/compliance/audit-tracker' },
    { label: 'Governance', route: '/compliance/governance' },
    { label: 'Declarations', route: '/compliance/declarations' },
    { label: 'Attendance', route: '/hr-essentials/attendance' },
    { label: 'Travel', route: '/hr-essentials/travel' },
    { label: 'Insurance', route: '/hr-essentials/insurance' },
    { label: 'Learning', route: '/hr-essentials/learning' },
  ];

  ngOnInit(): void {
    this.copilotContextStore.setContext('home', 'Landing dashboard');
  }
}
