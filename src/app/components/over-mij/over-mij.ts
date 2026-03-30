import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

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
export class OverMij implements AfterViewInit {
  @ViewChild('radarCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  skills: Skill[] = [
    // Backend
    {label: 'Java', value: 0.95},
    {label: 'Spring Boot', value: 0.87},

    // Frontend
    {label: 'Angular', value: 0.65},
    {label: 'TypeScript', value: 0.62},

    // Data
    {label: 'JPA / Hibernate', value: 0.85},
    {label: 'MySQL', value: 0.75},
    {label: 'Liquibase', value: 0.82},

    // Soft skills
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
    this.drawRadar();
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

    // Grid levels
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
      ctx.strokeStyle = lvl === levels ? '#d0d0d0' : '#e8e8e8';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axis lines
    for (let i = 0; i < count; i++) {
      const angle = startAngle + angleStep * i;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Data fill
    ctx.beginPath();
    for (let i = 0; i <= count; i++) {
      const idx = i % count;
      const angle = startAngle + angleStep * idx;
      const r = maxR * this.skills[idx].value;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = `${accent}15`;
    ctx.fill();

    // Data stroke
    ctx.beginPath();
    for (let i = 0; i <= count; i++) {
      const idx = i % count;
      const angle = startAngle + angleStep * idx;
      const r = maxR * this.skills[idx].value;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    for (let i = 0; i < count; i++) {
      const angle = startAngle + angleStep * i;
      const r = maxR * this.skills[i].value;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }

    // Labels
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

      ctx.fillStyle = '#3a3a3a';
      ctx.fillText(this.skills[i].label, x, y);
    }
  }
}
