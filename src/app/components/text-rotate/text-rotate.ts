import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {animate, query, stagger, style, transition, trigger,} from '@angular/animations';

@Component({
  selector: 'app-text-rotate',
  standalone: true,
  template: `
    <span class="text-rotate-wrapper" [class]="mainClassName">
      <span class="sr-only">{{ texts[currentIndex] }}</span>
      <span class="text-rotate-inner" [@charAnimation]="currentIndex" aria-hidden="true">
        @for (char of currentChars; track $index) {
          <span class="text-rotate-char" [class]="charClassName">{{ char === ' ' ? '\u00A0' : char }}</span>
        }
      </span>
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }

    .text-rotate-wrapper {
      display: inline-flex;
      position: relative;
      overflow: hidden;
    }

    .text-rotate-inner {
      display: inline-flex;
      flex-wrap: wrap;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }

    .text-rotate-char {
      display: inline-block;
    }
  `],
  animations: [
    trigger('charAnimation', [
      transition('* => *', [
        query('.text-rotate-char', [
          style({opacity: 0, transform: 'translateY(100%)'}),
          stagger('25ms', [
            animate('0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              style({opacity: 1, transform: 'translateY(0)'})
            ),
          ]),
        ], {optional: true}),
      ]),
    ]),
  ],
})
export class TextRotateComponent implements OnInit, OnDestroy {
  @Input() texts: string[] = [];
  @Input() rotationInterval = 2000;
  @Input() mainClassName = '';
  @Input() charClassName = '';

  currentIndex = 0;
  currentChars: string[] = [];

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.currentChars = Array.from(this.texts[0]);
    this.intervalId = setInterval(() => this.next(), this.rotationInterval);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private next() {
    this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    this.currentChars = Array.from(this.texts[this.currentIndex]);
    this.cdr.detectChanges();
  }
}
