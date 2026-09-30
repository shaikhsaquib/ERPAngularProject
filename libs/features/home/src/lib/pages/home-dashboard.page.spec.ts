import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CopilotContextStore, SessionStore } from '@timescapenu/core-state';
import { buildUser } from '@timescapenu/testing';
import { HomeDashboardPageComponent } from './home-dashboard.page';

describe('HomeDashboardPageComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeDashboardPageComponent],
      providers: [provideRouter([])],
    });
  });

  it('greets the signed-in user by name', () => {
    const sessionStore = TestBed.inject(SessionStore);
    sessionStore.setSession(buildUser({ displayName: 'Jane Doe' }), 'token');

    const fixture = TestBed.createComponent(HomeDashboardPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Jane Doe');
  });

  it('renders a quick-link card for every configured link', () => {
    const fixture = TestBed.createComponent(HomeDashboardPageComponent);
    fixture.detectChanges();

    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('.home-dashboard__card');
    expect(cards.length).toBe(fixture.componentInstance.quickLinks.length);
  });

  it('sets the Copilot context to home on init', () => {
    const copilotContext = TestBed.inject(CopilotContextStore);
    const fixture = TestBed.createComponent(HomeDashboardPageComponent);
    fixture.detectChanges();

    expect(copilotContext.activeModule()).toBe('home');
  });
});
