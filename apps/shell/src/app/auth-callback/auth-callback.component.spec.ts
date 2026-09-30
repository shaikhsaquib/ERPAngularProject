import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '@timescapenu/core-auth';
import { of, throwError } from 'rxjs';
import { AuthCallbackComponent } from './auth-callback.component';

describe('AuthCallbackComponent', () => {
  function setup(authServiceMock: Partial<AuthService>) {
    TestBed.configureTestingModule({
      imports: [AuthCallbackComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: authServiceMock }],
    });
    const fixture = TestBed.createComponent(AuthCallbackComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('shows an error when the callback URL has no valid SSO response', () => {
    const fixture = setup({ completeSsoLogin: jest.fn().mockReturnValue(null) });
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[role="alert"]')?.textContent).toContain(
      'Missing or invalid SSO response.',
    );
  });

  it('shows a signing-in message while the exchange is in flight', () => {
    const fixture = setup({ completeSsoLogin: jest.fn().mockReturnValue(of(undefined)) });
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Signing you in');
  });

  it('shows an error when the exchange fails', () => {
    const fixture = setup({
      completeSsoLogin: jest.fn().mockReturnValue(throwError(() => new Error('boom'))),
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[role="alert"]')?.textContent).toContain(
      'Could not complete sign-in',
    );
  });
});
