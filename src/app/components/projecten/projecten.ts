import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projecten',
  imports: [CommonModule, RouterModule],
  templateUrl: './projecten.html',
  styleUrl: './projecten.css',
})
export class Projecten {
  projects = [
    {
      slug: 'afstudeerstage-politie',
      title: 'Afstudeerstage',
      subtitle: 'Innovatiehuis Politie Noord-Nederland',
      description: 'Ontwikkeling van een modulaire paslezer voor de financiële recherche. De paslezer kan data uitlezen van creditcards, bankpassen, cryptokaarten, cadeaukaarten en identiteitsdocumenten zoals ID en paspoort. Dit gebeurt via NFC, magneetstrip en camera.',
      image: 'companys/politie_logo.png'
    },
    {
      slug: 'ocphell',
      title: 'OCPHell.nl',
      subtitle: 'Online platform',
      description: 'Een online platform voor het oefenen en trainen van Oracle Certified Professional examens. Volledige quiz-applicatie met progress tracking en uitgebreide uitleg.',
      image: 'header/header_ocphell.png'
    },
    {
      slug: 'croptimise',
      title: 'Eigen bedrijf',
      subtitle: 'Croptimise opgericht',
      description: 'Met drie anderen heb ik Croptimise opgericht, een startup die zich richt op innovatie binnen de agrarische sector. We ontwikkelden de Smart Potato, een slimme sensor die de omstandigheden in de bodem continu meet en deze gegevens realtime doorstuurt naar de boer. Met Croptimise ben ik 3e geworden bij de Rabobank ondernemers prijs 2023. We hadden en partnerschap met VodafoneZiggo, 5Groningen, Hanze, TNO en Dell EMC / VMware.',
      image: 'header/header_croptimise.png'
    },
    {
      slug: 'mobile-games',
      title: 'Mobile Games',
      subtitle: 'Android game development',
      description: 'Ontwikkeling van Android-games bij Vasco Games, waarbij ik verantwoordelijk was voor het volledige traject van concept tot publicatie in de Google Play Store. Ik werkte aan game design, gameplay-mechanieken, optimalisatie voor performance en het vergroten van user engagement. Daarnaast deed ik uitgebreide ervaring op met advertentie-integraties en in-app-aankopen, waaronder het optimaliseren van inkomstenstromen en het analyseren van spelersgedrag om de games continu te verbeteren.',
      image: 'header/header_mobile.jpg'
    }
  ];
}
