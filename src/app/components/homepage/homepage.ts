import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  imageVisible = true;
  imageScale = 1;
  currentImage = 'ik2.jpg';

  private readonly scaleStep = 0.05;
  private readonly minScale = 0.7;
  private readonly maxScale = 1.3;
  private sadTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private cdr: ChangeDetectorRef) {
  }

  closeImage() {
    this.currentImage = 'vincent_teleurgesteld.png';
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
    this.currentImage = 'vincent_teleurgesteld.png';
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
