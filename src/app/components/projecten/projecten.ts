import {Component} from '@angular/core';
import {TextRotateComponent} from '../text-rotate/text-rotate';
import {ProjectDetail, ProjectModalComponent} from '../project-modal/project-modal';

@Component({
  selector: 'app-projecten',
  imports: [TextRotateComponent, ProjectModalComponent],
  templateUrl: './projecten.html',
  styleUrl: './projecten.css',
})
export class Projecten {
  rotatingTexts = ['werkend.', 'mooi.', 'onderhoudbaar.', 'schaalbaar.', 'testbaar.', 'toekomstbestendig.'];
  selectedProject: ProjectDetail | null = null;

  openProject(project: ProjectDetail) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeProject() {
    this.selectedProject = null;
    document.body.style.overflow = '';
  }

  projects: ProjectDetail[] = [
    {
      slug: 'afstudeerstage-politie',
      title: 'Afstudeerstage',
      subtitle: 'Innovatiehuis Politie Noord-Nederland',
      description: 'Modulaire paslezer gebouwd voor de financiële recherche. Leest creditcards, bankpassen, cryptokaarten en ID\'s uit via NFC, magneetstrip en camera.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Het is vroeg in de ochtend wanneer de financiële recherche een woning binnenvalt na maanden van onderzoek. In de woonkamer liggen meerdere bankpassen, prepaidkaarten, cadeaukaarten en een identiteitsdocument verspreid op tafel. Elke minuut telt: betaalrekeningen kunnen op afstand worden geblokkeerd, cryptowallets kunnen leeggehaald worden en cruciale sporen kunnen verloren gaan.</p>

<p>Voor mijn afstudeerstage bij het Innovatiehuis Politie Noord-Nederland heb ik een universele, modulaire paslezer ontwikkeld die speciaal is ontworpen voor gebruik tijdens huiszoekingen en onderzoeken.</p>

<h3>Functionele mogelijkheden</h3>
<ul>
  <li><strong>NFC / RFID:</strong> Ondersteuning voor contactloze kaarten zoals debit- en creditcards (ISO 14443), OV-chipkaarten en andere smartcards</li>
  <li><strong>Magneetstrip:</strong> Uitlezen van alle drie de magneetstrip-tracks voor oudere bankpassen en cadeaukaarten</li>
  <li><strong>Visuele identificatie:</strong> Camera en OCR-technologie voor het scannen van identiteitskaarten en paspoorten</li>
</ul>

<h3>Architectuur</h3>
<p>Het systeem is modulair opgebouwd op een Raspberry Pi. Iedere uitleestechniek is een afzonderlijke softwaremodule die communiceert via een centrale applicatielaag. Nieuwe kaarttypen of methoden zijn eenvoudig toe te voegen zonder impact op bestaande functionaliteit.</p>

<h3>Beveiliging</h3>
<p>Alle uitgelezen gegevens worden lokaal opgeslagen en versleuteld. Er vindt geen externe communicatie plaats. Het systeem is ontworpen om aantoonbaar alleen informatie uit te lezen die op de kaart aanwezig is, zonder manipulatie.</p>
      `,
      image: 'companys/politie_logo.png',
      technologies: ['Python', 'Raspberry Pi', 'NFC / RFID', 'OCR', 'Computer Vision', 'Security'],
      year: '2025',
    },
    {
      slug: 'croptimise',
      title: 'Croptimise',
      subtitle: 'Eigen bedrijf opgericht',
      description: 'Startup in de agrarische sector. De Smart Potato meet bodemomstandigheden en stuurt data realtime door naar de boer.',
      detailedDescription: `
<h3>Over het bedrijf</h3>
<p>Croptimise is een startup die ik samen met drie anderen heb opgericht. Ons doel was om innovatieve technologische oplossingen te ontwikkelen voor de agrarische sector, met focus op precisielandbouw en datagestuurd boeren.</p>

<h3>De Smart Potato</h3>
<p>Ons hoofdproduct was de Smart Potato, een slimme sensor die in de bodem wordt geplaatst en continu verschillende parameters meet:</p>
<ul>
  <li><strong>Bodemvochtigheid:</strong> Voor optimaal irrigatiebeheer</li>
  <li><strong>Temperatuur:</strong> Om groeicondities te monitoren</li>
  <li><strong>Nutriënten:</strong> Voor precisiebemesting</li>
  <li><strong>pH-waarde:</strong> Voor bodemkwaliteit</li>
</ul>

<h3>Prestaties en partnerschappen</h3>
<ul>
  <li><strong>3e plaats bij de Rabobank Ondernemersprijs 2023</strong></li>
  <li><strong>Partnerschappen</strong> met VodafoneZiggo, 5Groningen, Hanze Hogeschool, TNO en Dell EMC / VMware</li>
  <li>Deelname aan verschillende innovatieprogramma's en accelerators</li>
</ul>

<h3>Technologie</h3>
<p>De sensoren communiceerden via LoRaWAN-netwerk met een cloud-platform waar de data werd verwerkt en gevisualiseerd in een gebruiksvriendelijk dashboard.</p>

<h3>Mijn rol</h3>
<p>Als mede-oprichter was ik verantwoordelijk voor de technische ontwikkeling van het platform, van hardware-integratie tot het bouwen van het cloud-platform en de frontend-applicatie.</p>
      `,
      image: 'header/header_croptimise.png',
      technologies: ['IoT', 'LoRaWAN', 'Cloud Computing', 'Angular', 'Python', 'Data Analytics'],
      year: '2021',
    },
    {
      slug: 'qwest',
      title: 'Qwest',
      subtitle: 'D&D Campaign Tool',
      description: 'Fullstack D&D tool met realtime chat, AI gestuurde NPC\'s en fijnmazig permissiesysteem.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Qwest is een fullstack webapplicatie waarmee je Dungeons & Dragons campagnes digitaal beheert en speelt. De applicatie draait op Angular aan de frontend en Spring Boot aan de backend.</p>

<h3>Campaigns en sessions</h3>
<p>Een Game Master kan campagnes aanmaken, spelers uitnodigen en sessions plannen. Binnen een sessie beschikt iedereen over een realtime chatsysteem gebouwd op WebSockets (STOMP). Het chatsysteem ondersteunt commando's zoals <strong>/roll</strong> voor dice rolls, <strong>/session</strong> voor sessiebeheer en <strong>/kick</strong> om spelers te verwijderen.</p>

<h3>AI NPC's met Spring AI</h3>
<p>NPC's kunnen reageren in de chat op basis van hun karakter, achtergrondverhaal en de context van het gesprek. Dit maakt het mogelijk om als GM geautomatiseerde, in-character reacties te krijgen van NPC's.</p>

<h3>Security</h3>
<p>Stateless JWT authenticatie via Spring Security met WebAuthn (passkeys) als moderne inlogmethode. Het permissiesysteem is fijnmazig opgezet: GM-only acties zijn afgeschermd en bij elke actie wordt gecontroleerd of de gebruiker lid is van de campaign.</p>

<h3>Technische details</h3>
<ul>
  <li><strong>Backend:</strong> Java 21 met Spring Boot, Spring Security, Spring AI en WebSockets (STOMP)</li>
  <li><strong>Frontend:</strong> Angular met TypeScript</li>
  <li><strong>Database:</strong> MySQL met Liquibase voor migraties</li>
  <li><strong>Security:</strong> JWT (stateless) en WebAuthn (passkeys)</li>
  <li><strong>Realtime:</strong> WebSockets via STOMP protocol</li>
</ul>
      `,
      image: 'projecten/qwest.png',
      technologies: ['Spring Boot', 'Spring AI', 'Angular', 'Java 21', 'WebSockets', 'JWT', 'WebAuthn', 'MySQL'],
      year: '2026',
    },
    {
      slug: 'quintor-masterclass',
      title: 'Quintor Masterclass',
      subtitle: 'Intensief leertraject',
      description: 'Praktijkgericht leertraject gericht op professionele Java backend development.',
      detailedDescription: `
<h3>Over het traject</h3>
<p>Bij Quintor heb ik een intensieve masterclass gevolgd gericht op professionele Java backend development. Het traject was bewust praktijkgericht opgezet: niet te veel theorie, maar vooral bouwen, samenwerken en direct toepasbare kennis opdoen.</p>

<h3>Wat ik heb geleerd</h3>
<ul>
  <li><strong>Spring Boot:</strong> Het opzetten en structureren van applicaties, dependency injection en het Spring ecosysteem</li>
  <li><strong>REST API's:</strong> Ontwerpen en bouwen van schaalbare API's volgens best practices</li>
  <li><strong>Security:</strong> Authenticatie en autorisatie implementeren binnen Spring Security</li>
  <li><strong>Database integratie:</strong> Werken met JPA en Hibernate voor data persistentie</li>
  <li><strong>Testing:</strong> Unit tests en integratietests als vast onderdeel van het ontwikkelproces</li>
  <li><strong>Clean code en architectuur:</strong> Layered architecture en onderhoudbare code</li>
</ul>

<h3>Impact</h3>
<p>De masterclass was een praktische versneller richting professioneel Java development. De kennis en werkwijze die ik hier heb opgedaan gebruik ik dagelijks in hoe ik zelfstandig complexe projecten opzet.</p>
      `,
      image: 'companys/quintor.png',
      technologies: ['Spring Boot', 'Java', 'REST API', 'Spring Security', 'JPA', 'Hibernate', 'Testing'],
      year: '2025',
    },
    {
      slug: 'ocphell',
      title: 'OCPHell.nl',
      subtitle: 'Online platform',
      description: 'Oefenplatform voor Oracle Certified Professional examens met progress tracking en uitgebreide uitleg.',
      detailedDescription: `
<h3>Over het project</h3>
<p>OCPHell.nl is een online platform dat ik heb ontwikkeld om studenten en professionals te helpen bij het voorbereiden op Oracle Certified Professional (OCP) examens. Het platform biedt honderden zorgvuldig samengestelde vragen.</p>

<h3>Functionaliteiten</h3>
<ul>
  <li><strong>Uitgebreide vragenbank:</strong> Honderden oefenvragen die alle OCP-onderwerpen afdekken</li>
  <li><strong>Gerichte leeropzet:</strong> Elke vraag focust op één specifiek onderdeel van de OCP-stof</li>
  <li><strong>Progress tracking:</strong> Voortgang volgen en zien welke onderwerpen extra aandacht nodig hebben</li>
  <li><strong>Gedetailleerde uitleg:</strong> Duidelijke uitleg bij elke vraag over het juiste antwoord</li>
</ul>

<h3>Technische aspecten</h3>
<p>Het platform is gebouwd met Angular en .NET, volledig responsive voor desktop en mobiel. De vragen zijn didactisch opgezet om de stof systematisch aan te leren.</p>
      `,
      image: 'header/header_ocphell.png',
      technologies: ['Angular', 'TypeScript', '.NET', 'SQL Server'],
      year: '2025',
      link: 'https://ocphell.nl',
    },
    {
      slug: 'mobile-games',
      title: 'Mobile Games',
      subtitle: 'Android game development',
      description: 'Android games bij Vasco Games, van concept tot publicatie. Het bedrijf stond op plek 3 wereldwijd op Android.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Bij Vasco Games was ik verantwoordelijk voor de ontwikkeling van Android-games, van concept tot publicatie in de Google Play Store. Vasco Games stond op <strong>plek 3 wereldwijd op Android</strong>, groter dan studio's als Ubisoft en EA. De games zijn samen <strong>meer dan 1 miljard keer gedownload</strong>.</p>

<h3>Werkzaamheden</h3>
<ul>
  <li><strong>Game Design & Concept:</strong> Bedenken van game concepten en gameplay-mechanieken</li>
  <li><strong>Development:</strong> Programmeren met focus op performance en gebruikerservaring</li>
  <li><strong>Online Multiplayer:</strong> Ik was de enige die een online multiplayer game heeft gemaakt en onderhouden</li>
  <li><strong>Publishing:</strong> Hele proces van app store submission en optimization</li>
</ul>

<h3>Monetization & Analytics</h3>
<ul>
  <li><strong>Advertentie-integraties:</strong> Banner ads, interstitial ads en rewarded video ads via AdMob</li>
  <li><strong>In-app purchases:</strong> Premium features, power-ups en cosmetische items</li>
  <li><strong>Analytics:</strong> Firebase Analytics voor spelersgedrag, churn en retention</li>
  <li><strong>A/B testing:</strong> Experimenteren met game mechanics en UI/UX voor conversie-optimalisatie</li>
</ul>
      `,
      image: 'header/header_mobile.jpg',
      technologies: ['Android', 'Java', 'Unity', 'Firebase', 'AdMob', 'Online Multiplayer'],
      year: '2018',
    },
  ];
}
