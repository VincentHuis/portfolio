import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  angle: number;
  baseRadius: number;
  currentRadius: number;
  angleSpeed: number;
  radialSpeed: number;
  radialPhase: number;
  size: number;
  hue: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
  opacity: number;
  text: string;
  flickerPhase: number;
}

@Component({
  selector: 'app-particle-background',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class ParticleBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() particleCount = 200;
  @Input() baseHue = 220;
  @Input() minRadius = 80; // Minimum distance from mouse
  @Input() maxRadius = 400; // Maximum distance from mouse
  @Input() fadeInnerRadius = 100; // Fade when closer than this
  @Input() fadeOuterRadius = 350; // Fade when further than this
  @Input() anchorElement?: HTMLElement; // Element to center particles on

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;
  private velocityX = 0;
  private velocityY = 0;
  private animationId = 0;
  private isDestroyed = false;
  private time = 0;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initParticles();
    this.animate();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationId);
  }

  @HostListener('window:resize')
  resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    this.updateCenter();
    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;
  }

  private anchorFound = false;

  private updateCenter(): void {
    const canvas = this.canvasRef.nativeElement;
    if (this.anchorElement && this.anchorElement.isConnected) {
      const canvasRect = canvas.parentElement!.getBoundingClientRect();
      const anchorRect = this.anchorElement.getBoundingClientRect();
      this.mouseX = anchorRect.left - canvasRect.left + anchorRect.width / 2;
      this.mouseY = anchorRect.top - canvasRect.top + anchorRect.height / 2;
      this.targetMouseX = this.mouseX;
      this.targetMouseY = this.mouseY;
      this.anchorFound = true;
    } else if (!this.anchorFound) {
      this.mouseX = canvas.width / 2;
      this.mouseY = canvas.height / 2;
      this.targetMouseX = this.mouseX;
      this.targetMouseY = this.mouseY;
    }
    // If anchor was found but is now gone, keep last known position
  }

  private initParticles(): void {
    this.particles = [];

    for (let i = 0; i < this.particleCount; i++) {
      // Fixed angle - particles stay in their direction from center
      const angle = Math.random() * Math.PI * 2;
      // Base distance from center
      const baseRadius = this.minRadius + Math.random() * (this.maxRadius - this.minRadius);
      // How far the particle travels in/out
      const radialRange = 60 + Math.random() * 100;

      this.particles.push({
        x: 0,
        y: 0,
        angle,
        baseRadius,
        currentRadius: baseRadius,
        angleSpeed: 0, // No rotation - particles move in/out only
        radialSpeed: 0.4 + Math.random() * 0.6, // Speed of back-and-forth
        radialPhase: Math.random() * Math.PI * 2,
        size: Math.random() * 5 + 2,
        hue: this.baseHue + Math.random() * 40 - 20,
        noiseOffsetX: radialRange, // Reusing this field for radial range
        noiseOffsetY: Math.random() * 1000,
        opacity: 1,
        text: this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)],
        flickerPhase: Math.random() * Math.PI * 2
      });
    }
  }

  private animate(): void {
    if (this.isDestroyed) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.time += 0.01;

    this.updateCenter();
    const centerX = this.mouseX;
    const centerY = this.mouseY;

    for (const particle of this.particles) {
      // Radial back-and-forth movement toward/away from center
      const radialRange = particle.noiseOffsetX;
      const radialOffset = Math.sin(this.time * particle.radialSpeed + particle.radialPhase) * radialRange;
      particle.currentRadius = particle.baseRadius + radialOffset;

      // Small perpendicular wobble for organic feel
      const wobble = Math.sin(this.time * 0.3 + particle.noiseOffsetY) * 8;

      const adjustedRadius = particle.currentRadius;

      // Calculate position relative to fixed center
      particle.x = centerX + Math.cos(particle.angle) * adjustedRadius + Math.cos(particle.angle + Math.PI / 2) * wobble;
      particle.y = centerY + Math.sin(particle.angle) * adjustedRadius + Math.sin(particle.angle + Math.PI / 2) * wobble;

      // Fade based on current distance from center
      const distance = Math.max(0, adjustedRadius);

      let opacity = 1;
      if (distance < this.fadeInnerRadius) {
        // Quadratic falloff for stronger center fade
        const t = distance / this.fadeInnerRadius;
        opacity = t * t;
      } else if (distance > this.fadeOuterRadius) {
        opacity = Math.max(0, 1 - (distance - this.fadeOuterRadius) / 100);
      }

      // Smooth opacity transition
      particle.opacity += (opacity - particle.opacity) * 0.15;

      this.drawParticle(particle);
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  // Alleen drawParticle vervangen: teken streepjes i.p.v. cirkels
  private codeSnippets = [
    'String', 'int', 'var', 'null', 'true', 'false', 'new',
    '=>', '{}', '()', '[]', ';', '==', '!='
  ];


  private drawParticle(particle: Particle): void {
    const { x, y, opacity, hue, text } = particle;

    const dx = x - this.mouseX;
    const dy = y - this.mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const inner = 10;
    const outer = 150;

    let mouseFade = 1;
    if (distance < inner) {
      mouseFade = 0;
    } else if (distance < outer) {
      const t = (distance - inner) / (outer - inner);
      mouseFade = t * t;
    }
    if (mouseFade <= 0) return;

    particle.flickerPhase += 0.015;
    const flicker = (Math.sin(particle.flickerPhase) + 1) / 2;

    let alpha =
      opacity *
      mouseFade *
      (0.15 + flicker * 0.25);

    // edge fade
    const edgePadding = 80;
    const edgeFadeX = Math.min(
      Math.min(x / edgePadding, (this.ctx.canvas.width - x) / edgePadding),
      1
    );
    const edgeFadeY = Math.min(
      Math.min(y / edgePadding, (this.ctx.canvas.height - y) / edgePadding),
      1
    );
    alpha *= Math.max(0, Math.min(edgeFadeX, edgeFadeY));

    this.ctx.font = '11px "Space Mono", monospace';
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;

    this.ctx.fillText(text, Math.round(x), Math.round(y));
  }

}
