import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {ParticleBackgroundComponent} from './effect';

@Component({
  selector: 'app-homepage',
  imports: [ParticleBackgroundComponent],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements AfterViewInit {
  @ViewChild('photoEl') photoElRef?: ElementRef<HTMLElement>;
  photoAnchor?: HTMLElement;
  imageVisible = true;
  imageScale = 1;
  currentImage = 'ik2.jpg';

  private readonly scaleStep = 0.05;
  private readonly minScale = 0.7;
  private readonly maxScale = 1.3;
  private sadTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    if (this.photoElRef) {
      this.photoAnchor = this.photoElRef.nativeElement;
      this.cdr.detectChanges();
    }
  }

  closeImage() {
    this.currentImage = 'vincent_teleurgesteld.jpg';
    this.cdr.detectChanges();
    setTimeout(() => {
      this.imageVisible = false;
      this.cdr.detectChanges();
    }, 1500);
  }

  shrinkImage() {
    this.imageScale = Math.max(this.minScale, this.imageScale - this.scaleStep);
    if (this.sadTimeout) {
      clearTimeout(this.sadTimeout);
    }
    this.currentImage = 'vincent_teleurgesteld.jpg';
    this.cdr.detectChanges();
    this.sadTimeout = setTimeout(() => {
      this.currentImage = 'ik2.jpg';
      this.sadTimeout = null;
      this.cdr.detectChanges();
    }, 700);
  }

  growImage() {
    this.imageScale = Math.min(this.maxScale, this.imageScale + this.scaleStep);
  }
}
