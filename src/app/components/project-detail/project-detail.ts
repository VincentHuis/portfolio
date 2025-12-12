import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  image: string;
  technologies?: string[];
  year?: string;
  link?: string;
  youtubeVideos?: { title: string; videoId: string }[];
}

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail implements OnInit {
  project: Project | null = null;

  projects: Project[] = [
    {
      slug: 'afstudeerstage-politie',
      title: 'Afstudeerstage',
      subtitle: 'Innovatiehuis Politie Noord-Nederland',
      description: 'Ontwikkeling van een modulaire paslezer voor de financiële recherche. De paslezer kan data uitlezen van creditcards, bankpassen, cryptokaarten, cadeaukaarten en identiteitsdocumenten zoals ID en paspoort. Dit gebeurt via NFC, magneetstrip en camera.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Het is vroeg in de ochtend wanneer de financiële recherche een woning binnenvalt na maanden van onderzoek. In de woonkamer liggen meerdere bankpassen, prepaidkaarten, cadeaukaarten en een identiteitsdocument verspreid op tafel. Elke minuut telt: betaalrekeningen kunnen op afstand worden geblokkeerd, cryptowallets kunnen leeggehaald worden en cruciale sporen kunnen verloren gaan. Om effectief te handelen moeten rechercheurs direct inzicht krijgen in welke kaarten actief zijn, welke technologie ze gebruiken en welke data erop aanwezig is.</p>

<p>Voor mijn afstudeerstage bij het Innovatiehuis Politie Noord-Nederland heb ik een universele, modulaire paslezer ontwikkeld die speciaal is ontworpen voor gebruik tijdens huiszoekingen en onderzoeken. Het doel van dit systeem is om rechercheurs ter plaatse, zonder gespecialiseerde technische kennis, snel en gecontroleerd kaartgegevens te laten uitlezen.</p>

<h3>Functionele mogelijkheden</h3>
<p>De paslezer is ontworpen als één geïntegreerd systeem dat meerdere uitleestechnologieën combineert. Hierdoor kunnen verschillende kaarttypen binnen één workflow worden verwerkt:</p>
<ul>
  <li>
    <strong>NFC / RFID:</strong>
    Ondersteuning voor contactloze kaarten zoals debit- en creditcards (ISO 14443), OV-chipkaarten en andere smartcards. De lezer detecteert automatisch het kaarttype en leest beschikbare kaartinformatie uit zonder fysieke interactie.
  </li>
  <li>
    <strong>Magneetstrip:</strong>
    Uitlezen van alle drie de magneetstrip-tracks, waardoor ook oudere bankpassen, cadeaukaarten en prepaidkaarten kunnen worden geanalyseerd.
  </li>
  <li>
    <strong>Visuele identificatie (camera + OCR):</strong>
    Met behulp van een camera en OCR-technologie worden identiteitskaarten en paspoorten gescand. Tekstvelden worden automatisch herkend en omgezet naar gestructureerde data.
  </li>
</ul>

<h3>Architectuur en technische opzet</h3>
<p>Het systeem is modulair opgebouwd, waarbij iedere uitleestechniek is geïmplementeerd als een afzonderlijke softwaremodule. Deze modules communiceren via een centrale applicatielaag, waardoor nieuwe kaarttypen of uitleesmethoden eenvoudig toegevoegd kunnen worden zonder impact op bestaande functionaliteit.</p>

<p>De hardware is gebaseerd op een Raspberry Pi, gekoppeld aan gespecialiseerde kaartlezers. De software is ontwikkeld in Python vanwege de sterke ondersteuning voor hardware-interactie en de beschikbaarheid van gespecialiseerde libraries voor NFC, magneetstrip en OCR.</p>

<p>De gebruikersinterface is bewust eenvoudig gehouden en gericht op snelheid en duidelijkheid. Rechercheurs krijgen direct feedback over het gedetecteerde kaarttype en de beschikbare informatie, zonder geconfronteerd te worden met technische details.</p>

<h3>Beveiliging en betrouwbaarheid</h3>
<p>Omdat het systeem wordt ingezet binnen strafrechtelijk onderzoek, is beveiliging een essentieel onderdeel van het ontwerp. Alle uitgelezen gegevens worden lokaal opgeslagen en versleuteld. Er vindt geen externe communicatie plaats, waardoor het risico op datalekken wordt geminimaliseerd.</p>

<p>Daarnaast is er nadrukkelijk rekening gehouden met de juridische betrouwbaarheid van de data. Het systeem is ontworpen om aantoonbaar alleen informatie uit te lezen die daadwerkelijk op de kaart aanwezig is, zonder deze te manipuleren. Dit is van belang om de data te kunnen gebruiken als ondersteunend bewijsmateriaal.</p>

<h3>Ontwikkelproces en validatie</h3>
<p>De ontwikkeling vond plaats volgens een Agile-werkwijze, met korte iteraties en regelmatige feedbackmomenten met de financiële recherche. Hierdoor kon het systeem continu worden afgestemd op de praktijk. Verschillende soorten kaarten van diverse uitgevers zijn getest om de compatibiliteit en betrouwbaarheid te valideren.</p>

<h3>Resultaat</h3>
<p>Het eindresultaat is een werkend proof-of-concept dat laat zien hoe rechercheurs op locatie sneller inzicht kunnen krijgen in financiële middelen en identiteiten. Door het elimineren van de stap waarbij pasjes eerst naar een gespecialiseerd lab moeten worden gestuurd, wordt kostbare tijd bespaard.</p>

<p>Dankzij de modulaire architectuur is het systeem toekomstbestendig en eenvoudig uit te breiden met nieuwe kaarttechnologieën of analysemethoden. Het project toont mijn vermogen om complexe technische eisen te vertalen naar een praktisch en betrouwbaar systeem binnen een veiligheidskritische omgeving.</p>

     `,
      image: 'companys/politie_logo.png',
      technologies: [
        'Python',
        'Raspberry Pi',
        'NFC / RFID',
        'Magneetstrip',
        'OCR',
        'Computer Vision',
        'Hardware Integration',
        'Embedded Systems',
        'Security',
        'Data Encryption',
        'Local Data Storage',
        'Agile / Scrum',
        'Prototyping'
      ],
      year: '2023'
    },
    {
      slug: 'ocphell',
      title: 'OCPHell.nl',
      subtitle: 'Online platform',
      description: 'Een online platform voor het oefenen en trainen van Oracle Certified Professional examens. Volledige quiz-applicatie met progress tracking en uitgebreide uitleg.',
      detailedDescription: `
       <h3>Over het project</h3>
<p>OCPHell.nl is een online platform dat ik heb ontwikkeld om studenten en professionals te helpen bij het voorbereiden op Oracle Certified Professional (OCP) examens. Het platform biedt een uitgebreide quiz-applicatie met honderden zorgvuldig samengestelde vragen die zijn ontworpen om de leerstof van het OCP-examen volledig te beheersen.</p>

<h3>Functionaliteiten</h3>
<ul>
  <li><strong>Uitgebreide vragenbank:</strong> Honderden oefenvragen die alle OCP-onderwerpen afdekken</li>
  <li><strong>Gerichte leeropzet:</strong> Elke vraag focust bewust op één specifiek onderdeel van de OCP-stof, zodat gebruikers elk concept afzonderlijk en grondig leren</li>
  <li><strong>Progress tracking:</strong> Gebruikers kunnen hun voortgang volgen en direct zien welke onderwerpen extra aandacht nodig hebben</li>
  <li><strong>Gedetailleerde uitleg:</strong> Bij elke vraag wordt duidelijke en inhoudelijke uitleg gegeven over het juiste antwoord</li>
  <li><strong>Verschillende moeilijkheidsgraden:</strong> Van beginner tot expert niveau</li>
</ul>

<h3>Technische aspecten</h3>
<p>Het platform is gebouwd met moderne webtechnologieën en is volledig responsive, waardoor oefenen mogelijk is op zowel desktop als mobiele apparaten. De backend beheert gebruikersaccounts, voortgang en statistieken. De vragen zijn nadrukkelijk geen echte OCP-examenvragen, maar didactisch opgezet om de volledige stof systematisch en effectief aan te leren.</p>

<h3>Resultaat</h3>
<p>OCPHell.nl wordt gebruikt door studenten en professionals die zich voorbereiden op hun OCP-certificering. Door de focus op één onderwerp per vraag helpt het platform gebruikers om hiaten in kennis te dichten en met vertrouwen het echte examen in te gaan.</p>
`,
      image: 'header/header_ocphell.png',
      technologies: ['Angular', 'TypeScript', '.NET', 'SQL Server'],
      year: '2022',
      link: 'https://ocphell.nl'
    },
    {
      slug: 'croptimise',
      title: 'Eigen bedrijf',
      subtitle: 'Croptimise opgericht',
      description: 'Met drie anderen heb ik Croptimise opgericht, een startup die zich richt op innovatie binnen de agrarische sector. We ontwikkelden de Smart Potato, een slimme sensor die de omstandigheden in de bodem continu meet en deze gegevens realtime doorstuurt naar de boer. Met Croptimise ben ik 3e geworden bij de Rabobank ondernemers prijs 2023. We hadden en partnerschap met VodafoneZiggo, 5Groningen, Hanze, TNO en Dell EMC / VMware.',
      detailedDescription: `
        <h3>Over het bedrijf</h3>
        <p>Croptimise is een startup die ik samen met drie anderen heb opgericht. Ons doel was om innovatieve technologische oplossingen te ontwikkelen voor de agrarische sector, met focus op precisielandbouw en datagestuurd boeren.</p>

        <h3>De Smart Potato</h3>
        <p>Ons hoofdproduct was de Smart Potato, een slimme sensor die in de bodem wordt geplaatst en continue verschillende parameters meet:</p>
        <ul>
          <li><strong>Bodemvochtigheid:</strong> Voor optimaal irrigatiebeheer</li>
          <li><strong>Temperatuur:</strong> Om groeicondities te monitoren</li>
          <li><strong>Nutriënten:</strong> Voor precisiebemesting</li>
          <li><strong>pH-waarde:</strong> Voor bodemkwaliteit</li>
        </ul>
        <p>De sensor stuurt deze gegevens realtime door naar een dashboard waar de boer zijn gewassen kan monitoren en op basis van data beslissingen kan nemen.</p>

        <h3>Prestaties en partnerschappen</h3>
        <p>Met Croptimise hebben we verschillende mijlpalen bereikt:</p>
        <ul>
          <li><strong>3e plaats bij de Rabobank Ondernemersprijs 2023</strong></li>
          <li><strong>Partnerschappen</strong> met VodafoneZiggo, 5Groningen, Hanze Hogeschool, TNO en Dell EMC / VMware</li>
          <li>Deelname aan verschillende innovatieprogramma's en accelerators</li>
        </ul>

        <h3>Technologie</h3>
        <p>Het project combineerde IoT, cloud computing en data-analyse. De sensoren communiceerden via LoRaWAN-netwerk met een cloud-platform waar de data werd verwerkt en gevisualiseerd in een gebruiksvriendelijk dashboard.</p>

        <h3>Mijn rol</h3>
        <p>Als mede-oprichter was ik verantwoordelijk voor de technische ontwikkeling van het platform, van hardware-integratie tot het bouwen van het cloud-platform en de frontend-applicatie.</p>
      `,
      image: 'header/header_croptimise.png',
      technologies: ['IoT', 'LoRaWAN', 'Cloud Computing', 'Data Analytics', 'Angular', 'Python'],
      year: '2023',
      youtubeVideos: [
        { title: 'Introductie van het project', videoId: '-0DlRbL6Pzc' },
        { title: 'Extra achtergrond en demo', videoId: 'FPRueHZPr4A' }
      ]
    },
    {
      slug: 'mobile-games',
      title: 'Mobile Games',
      subtitle: 'Android game development',
      description: 'Ontwikkeling van Android-games bij Vasco Games, waarbij ik verantwoordelijk was voor het volledige traject van concept tot publicatie in de Google Play Store. Ik werkte aan game design, gameplay-mechanieken, optimalisatie voor performance en het vergroten van user engagement. Daarnaast deed ik uitgebreide ervaring op met advertentie-integraties en in-app-aankopen, waaronder het optimaliseren van inkomstenstromen en het analyseren van spelersgedrag om de games continu te verbeteren.',
      detailedDescription: `
<h3>Over het project</h3>
<p>
  Bij Vasco Games was ik verantwoordelijk voor de ontwikkeling van Android-games, van concept tot publicatie in de Google Play Store.
  Dit omvatte het volledige ontwikkelingsproces inclusief game design, programmeren, testen en live operations.
</p>

<p>
Vasco Games was wereldwijd een van de grootste spelers binnen het Android-ecosysteem. Het bedrijf stond op <strong>plek 3 wereldwijd op Android</strong>, en was op dat platform groter dan studio’s als Ubisoft en Electronic Arts (EA). De Android-games van Vasco Games zijn samen <strong>meer dan 1 miljard keer gedownload</strong>.
</p>

<h3>Werkzaamheden en verantwoordelijkheden</h3>
<ul>
  <li><strong>Game Design & Concept:</strong> Bedenken van game concepten en uitwerken van gameplay-mechanieken die spelers betrokken houden</li>
  <li><strong>Development:</strong> Programmeren van games met focus op performance, gebruikerservaring en stabiele gameplay</li>
  <li><strong>Performance Optimalisatie:</strong> Continue verbeteren van de performance, het verminderen van bugs en optimaliseren van memory usage</li>
  <li><strong>User Engagement:</strong> Implementeren van features zoals achievements, leaderboards en social sharing om spelers betrokken te houden</li>
  <li><strong>Testing & Quality Assurance:</strong> Uitgebreid testen op verschillende Android-devices en OS-versies</li>
  <li><strong>Publishing:</strong> Hele proces van app store submission, inclusief screenshots, beschrijvingen en app store optimization</li>
</ul>

<h3>Monetization & Analytics</h3>
<p>
  Een belangrijk aspect van mobile game development is het genereren van inkomsten en het begrijpen van gebruikersgedrag.
  Hiervoor heb ik uitgebreide ervaring opgedaan met:
</p>
<ul>
  <li><strong>Advertentie-integraties:</strong> Implementatie van verschillende ad-formaten zoals banner ads, interstitial ads en rewarded video ads via AdMob</li>
  <li><strong>In-app purchases:</strong> Opzetten van premium features, power-ups en cosmetische items die spelers kunnen kopen</li>
  <li><strong>A/B testing:</strong> Experimenteren met verschillende game mechanics en UI/UX om conversie te optimaliseren</li>
  <li><strong>Analytics & Data:</strong> Gebruik van Firebase Analytics om spelersgedrag te analyseren, churn te identificeren en retention te verbeteren</li>
  <li><strong>Revenue Optimization:</strong> Balanceren van advertenties en IAP om inkomsten te maximaliseren zonder de gebruikerservaring te schaden</li>
</ul>

<h3>Technische vaardigheden</h3>
<p>Door deze ervaring heb ik expertise opgebouwd in:</p>
<ul>
  <li>Unity game engine voor cross-platform development</li>
  <li>Ik was de enige die een online multiplayer game heeft gemaakt en onderhouden (overdag ~10 spelers continue)</li>
  <li>Android SDK en Java/Kotlin voor native development</li>
  <li>Performance optimization en memory management op mobile devices</li>
  <li>UI/UX design principles specifiek voor mobile gaming</li>
  <li>Backend integraties voor multiplayer features en leaderboards</li>
  <li>Publishing workflow en app store optimization</li>
  <li>User retention en monetization strategieën</li>
</ul>

<h3>Uitdagingen & Oplossingen</h3>
<p>
  Mobile game development brengt unieke uitdagingen met zich mee. Een belangrijke uitdaging was het optimaliseren van games
  voor een breed scala aan Android-devices met verschillende hardware specificaties. Door gebruik te maken van adaptive graphics
  settings en efficiënte resource management kon ik ervoor zorgen dat games soepel draaiden op zowel high-end als low-end devices.
</p>
<p>
  Een andere uitdaging was het balanceren van monetization met gebruikerservaring. Door data-analyse en user feedback kon ik
  de juiste balans vinden tussen advertenties, in-app purchases en gameplay, wat resulteerde in hogere retention en revenue.
</p>

<h3>Resultaat</h3>
<p>
  De games die ik heb ontwikkeld zijn succesvol gelanceerd in de Google Play Store en hebben duizenden downloads behaald.
  Door continue optimalisatie op basis van analytics en het implementeren van user feedback kon ik de games steeds verder
  verbeteren. Dit resulteerde in hogere user ratings, betere retention cijfers en groeiende revenue streams.
</p>
<p>
  Deze ervaring heeft mij waardevolle inzichten gegeven in het complete product lifecycle van mobile apps, van concept tot
  live operations, en heeft mijn vaardigheden in game development, data-analyse en product management aanzienlijk versterkt.
</p>
      `,
      image: 'header/header_mobile.jpg',
      technologies: ['Android', 'Java', 'Online Multiplayer', 'Unity', 'Game Development', 'AdMob', 'Firebase', 'In-App Purchases', 'Analytics', 'Performance Optimization'],
      year: '2018'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.project = this.projects.find(p => p.slug === slug) || null;
      if (!this.project) {
        this.router.navigate(['/']);
      }
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getSafeYoutubeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }
}
