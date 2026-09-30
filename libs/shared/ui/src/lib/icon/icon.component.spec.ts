import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  function svg(): SVGElement {
    return fixture.debugElement.query(By.css('svg')).nativeElement;
  }

  it('renders with default inputs', () => {
    fixture.detectChanges();
    expect(component.name).toBe('check');
    expect(component.size).toBe('md');
  });

  it('is hidden from assistive tech', () => {
    fixture.detectChanges();
    expect(svg().getAttribute('aria-hidden')).toBe('true');
  });

  it('applies the correct size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    expect(svg().classList).toContain('tsn-icon--lg');
  });

  it('renders the path for the selected icon name', () => {
    component.name = 'bell';
    fixture.detectChanges();
    const path = fixture.debugElement.query(By.css('path')).nativeElement as SVGPathElement;
    expect(path.getAttribute('d')).toBe(component.path);
    expect(component.path.length).toBeGreaterThan(0);
  });

  it('changes path data when name changes', () => {
    component.name = 'search';
    const searchPath = component.path;
    component.name = 'close';
    const closePath = component.path;
    expect(searchPath).not.toBe(closePath);
  });
});
