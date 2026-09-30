import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<BadgeComponent>;
  let component: BadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
  });

  function span(): HTMLSpanElement {
    return fixture.debugElement.query(By.css('.tsn-badge')).nativeElement;
  }

  it('defaults to the neutral tone', () => {
    fixture.detectChanges();
    expect(component.tone).toBe('neutral');
    expect(span().classList).toContain('tsn-badge--neutral');
  });

  it('applies the correct tone class', () => {
    component.tone = 'success';
    fixture.detectChanges();
    expect(span().classList).toContain('tsn-badge--success');
    expect(span().classList).not.toContain('tsn-badge--neutral');
  });

  it('projects the label content', () => {
    fixture.detectChanges();
    expect(span()).toBeTruthy();
  });
});
