import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

/**
 * jsdom (used by jest-preset-angular) does not implement `<dialog>`'s
 * imperative API at all — not even as a stub. Polyfill just enough of it
 * (`showModal` / `close` / `open`) so the effect-driven open/close logic
 * can be exercised here.
 */
function ensureDialogPolyfill(): void {
  const proto = HTMLDialogElement.prototype as unknown as {
    showModal?: (this: HTMLDialogElement) => void;
    close?: (this: HTMLDialogElement) => void;
  };

  if (typeof proto.showModal !== 'function') {
    proto.showModal = function (this: HTMLDialogElement): void {
      (this as unknown as { open: boolean }).open = true;
    };
  }

  if (typeof proto.close !== 'function') {
    proto.close = function (this: HTMLDialogElement): void {
      (this as unknown as { open: boolean }).open = false;
      this.dispatchEvent(new Event('close'));
    };
  }
}

ensureDialogPolyfill();

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: `
    <tsn-modal [open]="open" [size]="size" (closed)="onClosed()">
      <span tsnModalHeader>Title</span>
      <p>Body</p>
      <span tsnModalFooter>Footer</span>
    </tsn-modal>
  `,
})
class HostComponent {
  open = false;
  size: 'sm' | 'md' | 'lg' = 'md';
  closedCount = 0;

  onClosed(): void {
    this.closedCount++;
  }
}

describe('ModalComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function dialog(): HTMLDialogElement {
    return fixture.nativeElement.querySelector('dialog');
  }

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('does not open the native dialog while open is false', () => {
    expect(dialog().open).toBeFalsy();
  });

  it('calls showModal on the native dialog when open becomes true', async () => {
    host.open = true;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dialog().open).toBe(true);
  });

  it('closes the native dialog when open goes back to false', async () => {
    host.open = true;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(dialog().open).toBe(true);

    host.open = false;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dialog().open).toBe(false);
  });

  it('emits closed when the dialog fires a native close event', () => {
    dialog().dispatchEvent(new Event('close'));

    expect(host.closedCount).toBe(1);
  });

  it('applies the size modifier class', () => {
    host.size = 'lg';
    fixture.detectChanges();

    expect(dialog().classList).toContain('tsn-modal--lg');
  });
});
