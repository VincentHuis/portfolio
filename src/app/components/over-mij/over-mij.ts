import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

interface Skill {
  label: string;
  value: number;
}

@Component({
  selector: 'app-over-mij',
  standalone: true,
  templateUrl: './over-mij.html',
  styleUrl: './over-mij.css',
})
export class OverMij implements AfterViewInit, OnDestroy {
  @ViewChild('radarCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationId = 0;
  private progress = 0; // 0 to 1 for grow-in
  private time = 0;
  private isDestroyed = false;
  private hasAnimatedIn = false;
  private observer?: IntersectionObserver;

  skills: Skill[] = [
    {label: 'Java', value: 0.95},
    {label: 'Spring Boot', value: 0.87},
    {label: 'Angular', value: 0.65},
    {label: 'TypeScript', value: 0.62},
    {label: 'JPA / Hibernate', value: 0.85},
    {label: 'MySQL', value: 0.75},
    {label: 'Liquibase', value: 0.82},
    {label: 'Samenwerken', value: 0.95},
    {label: 'Communicatie', value: 0.95},
    {label: 'Scrum / Agile', value: 0.9},
  ];

  timelineItems = [
    {
      year: '2026',
      title: 'Qwest',
      organization: 'Eigen project',
      description: 'Fullstack D&D campaign tool met Spring Boot, Angular, Spring AI, WebSockets en fijnmazig permissiesysteem.',
    },
    {
      year: '2025',
      title: 'Quintor Masterclass',
      organization: 'Quintor',
      description: 'Intensief leertraject gericht op professionele Java backend development. Spring Boot, security, testing en clean architecture.',
    },
    {
      year: '2025',
      title: 'Afstudeerstage',
      organization: 'Innovatiehuis Politie Noord-Nederland',
      description: 'Modulaire paslezer ontwikkeld voor de financiële recherche. NFC, magneetstrip en camera-integratie op Raspberry Pi.',
    },
    {
      year: '2025',
      title: 'OCPHell.nl',
      organization: 'Eigen project',
      description: 'Oefenplatform gebouwd voor Oracle Certified Professional examens met Angular en .NET.',
    },
    {
      year: '2021',
      title: 'Croptimise opgericht',
      organization: 'Eigen bedrijf',
      description: 'Startup in precisielandbouw. Smart Potato sensor gebouwd. 3e bij Rabobank Ondernemersprijs. Partners: VodafoneZiggo, TNO, Dell EMC.',
    },
    {
      year: '2018',
      title: 'Game Developer',
      organization: 'Vasco Games',
      description: 'Android games ontwikkeld voor het bedrijf dat op plek 3 wereldwijd stond. 1B+ downloads. Online multiplayer, monetization en analytics.',
    },
  ];

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;

    // Start animation when canvas scrolls into view
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.hasAnimatedIn) {
        this.hasAnimatedIn = true;
        this.animate();
      }
    }, {threshold: 0.3});

    this.observer.observe(canvas);
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationId);
    this.observer?.disconnect();
  }

  private animate() {
    if (this.isDestroyed) return;

    this.time += 0.015;

    // Grow-in: ease-out over ~1.5 seconds
    if (this.progress < 1) {
      this.progress = Math.min(1, this.progress + 0.018);
    }

    this.drawRadar();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private drawRadar() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const size = 600;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = 180;
    const levels = 4;
    const count = this.skills.length;
    const angleStep = (Math.PI * 2) / count;
    const startAngle = -Math.PI / 2;
    const accent = '#0066ff';

    // Eased progress for smooth grow-in
    const ease = 1 - Math.pow(1 - this.progress, 3);

    // Subtle breathing pulse after grow-in completes
    const breathe = this.progress >= 1
      ? 1 + Math.sin(this.time * 0.8) * 0.02
      : 1;

    const scale = ease * breathe;

    // Grid levels (fade in with progress)
    const gridAlpha = Math.min(1, this.progress * 2);
    for (let lvl = 1; lvl <= levels; lvl++) {
      const r = (maxR / levels) * lvl;
      ctx.beginPath();
      for (let i = 0; i <= count; i++) {
        const angle = startAngle + angleStep * i;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = lvl === levels
        ? `rgba(208, 208, 208, ${gridAlpha})`
        : `rgba(232, 232, 232, ${gridAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axis lines
    for (let i = 0; i < count; i++) {
      const angle = startAngle + angleStep * i;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = `rgba(224, 224, 224, ${gridAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Data fill (scaled)
    ctx.beginPath();
    for (let i = 0; i <= count; i++) {
      const idx = i % count;
      const angle = startAngle + angleStep * idx;
      const r = maxR * this.skills[idx].value * scale;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Glow effect
    const glowAlpha = this.progress >= 1
      ? 0.06 + Math.sin(this.time * 0.8) * 0.03
      : 0.06 * ease;
    ctx.fillStyle = `rgba(0, 102, 255, ${glowAlpha})`;
    ctx.fill();

    // Data stroke
    ctx.beginPath();
    for (let i = 0; i <= count; i++) {
      const idx = i % count;
      const angle = startAngle + angleStep * idx;
      const r = maxR * this.skills[idx].value * scale;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points with glow
    for (let i = 0; i < count; i++) {
      const angle = startAngle + angleStep * i;
      const r = maxR * this.skills[i].value * scale;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;

      // Point glow
      const pointGlow = this.progress >= 1
        ? 0.15 + Math.sin(this.time * 1.2 + i * 0.7) * 0.1
        : 0;
      if (pointGlow > 0) {
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 102, 255, ${pointGlow})`;
        ctx.fill();
      }

      // Main dot
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();

      // Inner white
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }

    // Labels (fade in)
    const labelAlpha = Math.min(1, Math.max(0, (this.progress - 0.4) * 2.5));
    ctx.font = '500 13px "Space Mono", monospace';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < count; i++) {
      const angle = startAngle + angleStep * i;
      const labelR = maxR + 35;
      const x = cx + Math.cos(angle) * labelR;
      const y = cy + Math.sin(angle) * labelR;

      const cos = Math.cos(angle);
      if (cos > 0.3) ctx.textAlign = 'left';
      else if (cos < -0.3) ctx.textAlign = 'right';
      else ctx.textAlign = 'center';

      ctx.fillStyle = `rgba(58, 58, 58, ${labelAlpha})`;
      ctx.fillText(this.skills[i].label, x, y);
    }
  }
}
