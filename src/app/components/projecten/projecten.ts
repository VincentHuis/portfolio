import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projecten',
  imports: [CommonModule],
  templateUrl: './projecten.html',
  styleUrl: './projecten.css',
})
export class Projecten {
  projects = [
    {
      title: 'Afstudeerstage',
      subtitle: 'Innovatiehuis Politie Noord-Nederland',
      description: 'Ontwikkeling van een modulaire paslezer voor de financiële recherche. De paslezer kan data uitlezen van creditcards, bankpassen, cryptokaarten, cadeaukaarten en identiteitsdocumenten zoals ID en paspoort. Dit gebeurt via NFC, magneetstrip en camera.',
      image: 'companys/politie_logo.png'
    },
    {
      title: 'OCPHell.nl',
      subtitle: 'Online platform',
      description: 'Een online platform voor het oefenen en trainen van Oracle Certified Professional examens. Volledige quiz-applicatie met progress tracking en uitgebreide uitleg.',
      image: ''
    },
    {
      title: 'Croptimise',
      subtitle: 'Eigen bedrijf opgericht',
      description: 'Met drie anderen heb ik Croptimise opgericht, een startup die zich richt op innovatie binnen de agrarische sector. We ontwikkelden de Smart Potato, een slimme sensor die de omstandigheden in de bodem continu meet en deze gegevens realtime doorstuurt naar de boer. Hierdoor krijgt de teler direct inzicht in vocht, temperatuur en andere belangrijke bodemwaarden, waardoor hij beter onderbouwde beslissingen kan nemen en het teeltproces verder kan optimaliseren.',
      image: ''
    },
    {
      title: 'Mobile Games',
      subtitle: 'Android game development',
      description: 'Ontwikkeling van Android-games bij Vasco Games, waarbij ik verantwoordelijk was voor het volledige traject van concept tot publicatie in de Google Play Store. Ik werkte aan game design, gameplay-mechanieken, optimalisatie voor performance en het vergroten van user engagement. Daarnaast deed ik uitgebreide ervaring op met advertentie-integraties en in-app-aankopen, waaronder het optimaliseren van inkomstenstromen en het analyseren van spelersgedrag om de games continu te verbeteren.',
      image: ''
    }
  ];
}
