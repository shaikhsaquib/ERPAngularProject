import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@timescapenu/core-auth';

@Component({
  standalone: true,
  selector: 'tsn-auth-callback',
  template: `
    @if (error()) {
    <p role="alert">Sign-in failed: {{ error() }}</p>
    } @else {
    <p>Signing you in&hellip;</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCallbackComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly error = signal<string | null>(null);

  constructor() {
    const result = this.authService.completeSsoLogin(window.location.href);
    if (!result) {
      this.error.set('Missing or invalid SSO response.');
      return;
    }
    result.subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => this.error.set('Could not complete sign-in. Please try again.'),
    });
  }
}
