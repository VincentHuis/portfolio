import {Component} from '@angular/core';
import {TextRotateComponent} from '../text-rotate/text-rotate';

@Component({
  selector: 'app-projecten',
    imports: [TextRotateComponent],
  templateUrl: './projecten.html',
  styleUrl: './projecten.css',
})
export class Projecten {
    rotatingTexts = ['werkend.', 'mooi.', 'snel.', 'robuust.', 'schaalbaar.'];

  projects = [
    {
      slug: 'afstudeerstage-politie',
      title: 'Afstudeerstage',
      subtitle: 'Innovatiehuis Politie Noord-Nederland',
        description: 'Modulaire paslezer gebouwd voor de financiële recherche. Leest creditcards, bankpassen, cryptokaarten en ID\'s uit via NFC, magneetstrip en camera.',
      image: 'companys/politie_logo.png',
        technologies: ['Python', 'Raspberry Pi', 'NFC / RFID', 'OCR', 'Computer Vision', 'Security'],
        year: '2023',
        featured: true,
    },
    {
      slug: 'croptimise',
        title: 'Croptimise',
        subtitle: 'Eigen bedrijf opgericht',
        description: 'Startup in de agrarische sector. De Smart Potato meet bodemomstandigheden en stuurt data realtime door naar de boer.',
      image: 'header/header_croptimise.png',
        technologies: ['IoT', 'LoRaWAN', 'Cloud Computing', 'Angular', 'Python', 'Data Analytics'],
        year: '2023',
        featured: true,
    },
    {
      slug: 'qwest',
      title: 'Qwest',
      subtitle: 'D&D Campaign Tool',
        description: 'Fullstack D&D tool met realtime chat, AI gestuurde NPC\'s en fijnmazig permissiesysteem.',
        image: 'projecten/qwest.png',
        technologies: ['Spring Boot', 'Spring AI', 'Angular', 'Java 21', 'WebSockets', 'JWT', 'WebAuthn', 'MySQL'],
        year: '2025',
        featured: false,
    },
    {
      slug: 'quintor-masterclass',
      title: 'Quintor Masterclass',
      subtitle: 'Intensief leertraject',
        description: 'Praktijkgericht leertraject gericht op professionele Java backend development.',
        image: 'companys/quintor.png',
        technologies: ['Spring Boot', 'Java', 'REST API', 'Spring Security', 'JPA', 'Hibernate', 'Testing'],
        year: '2025',
        featured: false,
    },
    {
      slug: 'ocphell',
      title: 'OCPHell.nl',
      subtitle: 'Online platform',
        description: 'Oefenplatform voor Oracle Certified Professional examens met progress tracking en uitgebreide uitleg.',
        image: 'header/header_ocphell.png',
        technologies: ['Angular', 'TypeScript', '.NET', 'SQL Server'],
        year: '2022',
        featured: false,
    },
    {
      slug: 'mobile-games',
      title: 'Mobile Games',
      subtitle: 'Android game development',
        description: 'Android games bij Vasco Games, van concept tot publicatie. Het bedrijf stond op plek 3 wereldwijd op Android.',
        image: 'header/header_mobile.jpg',
        technologies: ['Android', 'Java', 'Unity', 'Firebase', 'AdMob', 'Online Multiplayer'],
        year: '2018',
        featured: false,
    },
  ];
}
