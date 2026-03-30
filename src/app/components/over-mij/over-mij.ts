import {Component} from '@angular/core';

@Component({
  selector: 'app-over-mij',
  standalone: true,
  templateUrl: './over-mij.html',
  styleUrl: './over-mij.css',
})
export class OverMij {
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
}
