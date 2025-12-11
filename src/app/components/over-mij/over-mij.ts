import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-over-mij',
  imports: [CommonModule],
  templateUrl: './over-mij.html',
  styleUrl: './over-mij.css',
})
export class OverMij implements AfterViewInit {
  @ViewChild('section', { static: false }) section!: ElementRef;

  icons = [
    'ab-testing.png',
    'ads.png',
    'api.png',
    'app-development.png',
    'cloud-computing.png',
    'coding.png',
    'file-transfer.png',
    'javascript.png',
    'loading.png',
    'web-development.png'
  ];

  timelineEvents = [
    {
      year: '2025',
      title: 'Quintor',
      description: 'Java-consultant',
      side: 'left',
      logo: 'companys/quintor.png'
    },
    {
      year: '',
      title: '',
      description: '',
      side: 'milestone',
      logo: 'graduation.png',
      milestone: true,
      tooltipText: 'HBO-ICT afgerond met eindcijfer: 8'
    },
    {
      year: '2024',
      title: 'Innovatiehuis Politie Noord-Nederland',
      description: 'Afstudeerstage',
      side: 'right',
      logo: 'companys/politie_logo.png'
    },
    {
      year: '2022',
      title: 'Holland Casino',
      description: 'Horeca, interne opleider & croupier',
      side: 'left',
      logo: 'companys/holland_casino.jpg'
    },
    {
      year: '2021',
      title: 'Croptimise',
      description: 'Eigen bedrijf opgericht',
      side: 'right',
      logo: 'companys/croptimise.png'
    },
    {
      year: '2019',
      title: 'Infraconnect',
      description: 'Systeembeheerder',
      side: 'left',
      logo: 'companys/infraconnect_bv_logo.jpg'
    },
    {
      year: '2019',
      title: 'HBO-ICT',
      description: 'Hanze Groningen',
      side: 'right',
      milestone: true,
      logo: 'companys/start_edu.png',
      tooltipText: 'Start opleiding HBO-ICT te Hanze'

    },
    {
      year: '2018',
      title: 'Vasco Games B.V.',
      description: 'Android game developer',
      side: 'left',
      logo: 'companys/vasco-games-logo.jpg'
    },
    {
      year: '',
      title: '',
      description: '',
      side: 'milestone',
      logo: 'graduation.png',
      milestone: true,
      tooltipText: 'Applicatie ontwikkelaar afgerond aan Noorderpoort'
    },
    {
      year: '2016',
      title: 'Software Ontwikkelaar (Stage)',
      description: 'Dienst Uitvoering Onderwijs (DUO)',
      side: 'right',
      logo: 'companys/dienst_uitvoering_onderwijs_ministerie_van_ocw__logo.jpg'
    },
    {
      year: '2016',
      title: 'Software Ontwikkelaar (Stage)',
      description: 'New Heap',
      side: 'left',
      logo: 'companys/new_heap.png'
    },
    {
      year: '2016',
      title: 'Software Ontwikkelaar (Stage)',
      description: 'Ambta',
      side: 'right',
      logo: 'companys/studie.jpg'
    },
    {
      year: '2016',
      title: 'Noorderpoort',
      description: 'Applicatie Ontwikkelaar',
      side: 'left',
      milestone: true,
      logo: 'companys/start_edu.png',
      tooltipText: 'Start opleiding Applicatie Ontwikkelaar te Noorderpoort'
    },
  ];

  isShaking = false;
  hasShaken = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasShaken) {
          console.log('Shake animation triggered!');
          this.isShaking = true;
          this.hasShaken = true;
          setTimeout(() => {
            this.isShaking = false;
          }, 1500);
        }
      });
    }, { threshold: 0.2 });

    if (this.section) {
      observer.observe(this.section.nativeElement);
    }
  }
}
