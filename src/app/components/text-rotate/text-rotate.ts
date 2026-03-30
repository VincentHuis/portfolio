import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-text-rotate',
  standalone: true,
  template: `
    <span class="text-rotate-wrapper" [class]="mainClassName">
      <span class="sr-only">{{ texts[currentIndex] }}</span>
      <span #measurer class="measurer">{{ longestText }}</span>
      <span class="text-rotate-inner" aria-hidden="true">
        @for (char of currentChars; track $index) {
          <span
            class="text-rotate-char"
            [class]="charClassName"
            [style.animation-delay]="($index * 25) + 'ms'"
            [class.animate]="animating"
          >{{ char === ' ' ? '\u00A0' : char }}</span>
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
      min-height: 1em;
    }

    .sr-only, .measurer {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }

    .text-rotate-char {
      display: inline-block;
      opacity: 0;
      transform: translateY(100%);
    }

    .text-rotate-char.animate {
      animation: charIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    @keyframes charIn {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
})
export class TextRotateComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() texts: string[] = [];
  @Input() rotationInterval = 2000;
  @Input() mainClassName = '';
  @Input() charClassName = '';
  @ViewChild('measurer') measurer!: ElementRef<HTMLSpanElement>;

  currentIndex = 0;
  currentChars: string[] = [];
  animating = false;
  minWidth = 0;
  minHeight = 0;
  longestText = '';

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.longestText = this.texts.reduce((a, b) => a.length > b.length ? a : b, '');
    this.currentChars = Array.from(this.texts[0]);
    setTimeout(() => {
      this.animating = true;
      this.cdr.detectChanges();
    });
    this.intervalId = setInterval(() => this.next(), this.rotationInterval);
  }

  ngAfterViewInit() {
    // Measure the longest text to set min-width
    const el = this.measurer.nativeElement;
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.width = 'auto';
    el.style.height = 'auto';
    el.style.clip = 'unset';
    el.style.whiteSpace = 'nowrap';
    this.minWidth = el.offsetWidth;
    this.minHeight = el.offsetHeight;
    el.style.position = '';
    el.style.visibility = '';
    el.style.width = '';
    el.style.height = '';
    el.style.clip = '';
    el.style.whiteSpace = '';
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private next() {
    this.animating = false;
    this.currentChars = [];
    this.cdr.detectChanges();

    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.currentChars = Array.from(this.texts[this.currentIndex]);
      this.animating = true;
      this.cdr.detectChanges();
    }, 50);
  }
}
