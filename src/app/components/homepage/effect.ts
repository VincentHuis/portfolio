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
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
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
  @Input() baseHue = 30;
  @Input() minRadius = 80; // Minimum distance from mouse
  @Input() maxRadius = 400; // Maximum distance from mouse
  @Input() fadeInnerRadius = 100; // Fade when closer than this
  @Input() fadeOuterRadius = 350; // Fade when further than this

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
    // Initialize mouse to center
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.targetMouseX = this.mouseX;
    this.targetMouseY = this.mouseY;
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.targetMouseX = event.clientX;
    this.targetMouseY = event.clientY;
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

    // Track velocity before updating position
    const prevMouseX = this.mouseX;
    const prevMouseY = this.mouseY;

    // Smoothly follow mouse
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.06;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.06;

    // Calculate and smooth velocity
    const instantVelX = this.mouseX - prevMouseX;
    const instantVelY = this.mouseY - prevMouseY;
    this.velocityX += (instantVelX - this.velocityX) * 0.1;
    this.velocityY += (instantVelY - this.velocityY) * 0.1;

    // Velocity magnitude and direction
    const speed = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
    const velAngle = Math.atan2(this.velocityY, this.velocityX);

    for (const particle of this.particles) {
      // Radial back-and-forth movement toward/away from center
      const radialRange = particle.noiseOffsetX;
      const radialOffset = Math.sin(this.time * particle.radialSpeed + particle.radialPhase) * radialRange;
      particle.currentRadius = particle.baseRadius + radialOffset;

      // Small perpendicular wobble for organic feel
      const wobble = Math.sin(this.time * 0.3 + particle.noiseOffsetY) * 8;

      // Calculate how aligned this particle is with movement direction
      // 1 = moving toward particle, -1 = moving away from particle
      const angleDiff = particle.angle - velAngle;
      const alignment = Math.cos(angleDiff);

      // Shift particles toward movement direction
      // Particles in front get pulled closer, particles behind get pushed further
      const densityShift = alignment * speed * 15;
      const adjustedRadius = particle.currentRadius - densityShift;

      // Calculate position
      particle.x = this.mouseX + Math.cos(particle.angle) * adjustedRadius + Math.cos(particle.angle + Math.PI/2) * wobble;
      particle.y = this.mouseY + Math.sin(particle.angle) * adjustedRadius + Math.sin(particle.angle + Math.PI/2) * wobble;

      // Fade based on current distance from center
      // Stronger fade near center - like hitting an invisible blob
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

    this.ctx.font = '11px monospace';
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = `rgba(30, 30, 30, ${alpha})`;

    this.ctx.fillText(text, Math.round(x), Math.round(y));
  }

}
