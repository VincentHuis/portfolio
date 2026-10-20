import {Component, computed, ElementRef, inject, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {TextRotateComponent} from '../text-rotate/text-rotate';
import {ProjectDetail} from './project-detail';

const VISIBLE_REGULAR_PROJECTS = 4;

@Component({
  selector: 'app-projecten',
  imports: [TextRotateComponent, NgTemplateOutlet],
  templateUrl: './projecten.html',
  styleUrl: './projecten.css',
  host: {
    '(document:keydown.escape)': 'closeProject()',
  },
})
export class Projecten {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  rotatingTexts = ['werkend.', 'mooi.', 'onderhoudbaar.', 'schaalbaar.', 'testbaar.', 'toekomstbestendig.'];
  readonly selectedProject = signal<ProjectDetail | null>(null);
  readonly highlights = computed(() => this.projects.filter(p => p.highlight));
  readonly regularProjects = computed(() => this.projects.filter(p => !p.highlight));
  readonly showAllProjects = signal(false);
  readonly visibleRegularProjects = computed(() =>
    this.showAllProjects() ? this.regularProjects() : this.regularProjects().slice(0, VISIBLE_REGULAR_PROJECTS),
  );
  readonly hasMoreProjects = computed(() => this.regularProjects().length > VISIBLE_REGULAR_PROJECTS);
  readonly otherProjects = computed(() => this.projects.filter(p => p !== this.selectedProject()));

  toggleShowAll() {
    this.showAllProjects.update(showAll => !showAll);
  }

  toggleProject(project: ProjectDetail) {
    this.selectedProject.update(current => (current === project ? null : project));
    this.scrollToTop();
  }

  closeProject() {
    if (this.selectedProject()) {
      this.selectedProject.set(null);
      this.scrollToTop();
    }
  }

  private scrollToTop() {
    this.host.nativeElement.scrollIntoView({block: 'start'});
  }

  projects: ProjectDetail[] = [
    {
      slug: 'tender-ai',
      title: 'Tender AI',
      subtitle: 'AI schrijfassistent voor aanbestedingen',
      description: 'AI assistent die helpt bij het schrijven van aanbestedingen. Antwoorden zijn gebaseerd op de eigen projectdocumenten en de chatwidget past in elke webapplicatie.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Een aanbesteding schrijven is precisiewerk. De tekst moet kloppen, compleet zijn en aansluiten op alle bijlagen die bij het project horen. Tender AI is een AI schrijfassistent die direct in een bestaande aanbestedingsapplicatie draait. Gebruikers openen een chatvenster en stellen vragen over het hele document of over één geselecteerde sectie. De assistent helpt met schrijven, structureren, verbeteren en controleren.</p>

<h3>Functionaliteiten</h3>
<ul>
  <li><strong>Antwoorden op basis van eigen documenten:</strong> De bijlagen van een project worden gesynchroniseerd naar een kennisbank. De assistent baseert zijn antwoorden daarop (RAG)</li>
  <li><strong>Twee chatmodi:</strong> Vragen stellen over de volledige aanbesteding of over één specifieke sectie</li>
  <li><strong>Inbouwbare chatwidget:</strong> Gepubliceerd als Web Component, zodat hij werkt in plain HTML, JavaScript en React</li>
  <li><strong>Beheerportaal:</strong> Projecten aanmaken en koppelen aan documentbibliotheken</li>
  <li><strong>Automatische synchronisatie:</strong> Een geplande taak uploadt nieuwe bijlagen en houdt per document de status bij</li>
</ul>

<h3>Architectuur</h3>
<p>De backend is een modulaire monoliet gebouwd met Spring Modulith. De koppeling met het taalmodel zit achter een eigen gateway, waardoor een andere AI provider toevoegen neerkomt op één nieuwe module. De grenzen tussen modules worden automatisch getest, zodat de architectuur niet ongemerkt vervaagt.</p>

<h3>Security</h3>
<p>De widget gebruikt de bestaande sessie van de hostapplicatie en de backend controleert die server to server via OAuth2. Chatsessies zijn cryptografisch ondertekend en gekoppeld aan gebruiker en project. De systeemprompt is bestand tegen prompt injection en houdt de assistent bij het onderwerp.</p>

<h3>Technische details</h3>
<ul>
  <li><strong>Backend:</strong> Java 25 met Spring Boot 4 en Spring Modulith, Liquibase en MySQL</li>
  <li><strong>AI:</strong> Mistral voor documentverwerking, embeddings en retrieval</li>
  <li><strong>Chatwidget:</strong> Preact gecompileerd naar een Web Component</li>
  <li><strong>Beheerportaal:</strong> React 19 met TanStack Query</li>
  <li><strong>Kwaliteit:</strong> Architectuurtests, WireMock, SBOM generatie en vastgelegde architectuurbeslissingen</li>
</ul>
      `,
      image: 'projecten/tender_ai.png',
      technologies: ['Java 25', 'Spring Boot 4', 'Spring Modulith', 'Mistral AI', 'RAG', 'Web Components', 'React', 'MySQL'],
      year: '2026',
      highlight: true,
    },
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
      highlight: true,
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
      slug: 'voicedrop',
      title: 'VoiceDrop',
      subtitle: 'Wear OS stemnotities app',
      description: 'Handsfree stemnotities opnemen op je Wear OS horloge. Transcribeert on-device en synchroniseert direct naar je Android telefoon.',
      detailedDescription: `
<h3>Over het project</h3>
<p>VoiceDrop is een Wear OS app waarmee je met één tik een stemnotitie insprekt. De spraak wordt direct op het horloge getranscribeerd en zonder tussenkomst van een server gesynchroniseerd naar je Android telefoon.</p>

<h3>Functies</h3>
<ul>
  <li><strong>On-device transcriptie:</strong> Geen audio opgeslagen, geen server nodig, volledige privacy</li>
  <li><strong>Auto-categorisatie:</strong> Het eerste woord bepaalt het type: boodschappenlijst, herinnering, taak, idee of agenda-item</li>
  <li><strong>Slimme herinneringen:</strong> Natuurlijke taal zoals "morgen om 9" of "over een uur" wordt omgezet naar exacte alarmtijden</li>
  <li><strong>Locatieherinneringen:</strong> Meldingen op basis van geofences</li>
  <li><strong>Google Calendar:</strong> Directe toevoeging van notities als agenda-item</li>
  <li><strong>Home widget:</strong> Boodschappenlijst zichtbaar op het startscherm</li>
  <li><strong>Meertalig:</strong> Nederlands, Duits en Engels ondersteund</li>
</ul>

<h3>Technische opbouw</h3>
<p>De app bestaat uit twee modules: een Wear OS module voor opname en een mobile module voor opslag en weergave. Synchronisatie verloopt via de Wearable Data Layer zodat alles draadloos en betrouwbaar binnenkomt.</p>
      `,
      image: 'projecten/voice_drop (1) (2) (1).png',
      technologies: ['Kotlin', 'Wear OS', 'Jetpack Compose', 'Room', 'Wearable Data Layer', 'Google Calendar API'],
      year: '2026',
      link: 'https://github.com/VincentHuis/VoiceDrop',
    },
    {
      slug: 'drop-apps',
      title: 'Drop apps',
      subtitle: 'AI op je telefoon, zonder cloud',
      description: 'Drie Android apps voor geld, gezondheid en voeding. De AI draait volledig op het toestel zelf, zonder server en zonder API keys.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Na VoiceDrop bouwde ik meer apps met hetzelfde uitgangspunt: persoonlijke data hoort op je eigen telefoon te blijven. Elke app gebruikt een taalmodel dat lokaal op het toestel draait. Er is geen server, er gaan geen gegevens het internet op en er zijn geen API keys nodig.</p>

<h3>FinDrop</h3>
<p>Importeer een bankafschrift en zie per maand waar je geld naartoe gaat, in taart en staafdiagrammen.</p>
<ul>
  <li><strong>Eigen MT940 parser:</strong> Leest bankafschriften in, controleert begin en eindsaldo en filtert dubbele transacties</li>
  <li><strong>Categoriseren met Gemini Nano:</strong> Transacties worden lokaal ingedeeld in veertien categorieën via de ML Kit GenAI Prompt API</li>
  <li><strong>Leert van correcties:</strong> Pas je een categorie aan, dan onthoudt de app dat per tegenpartij en past hij ook eerdere transacties aan</li>
  <li><strong>Gedeelde rekening:</strong> Berekent per maand wie wat heeft betaald</li>
</ul>

<h3>FitDrop</h3>
<p>Leest je gezondheidsdata uit Health Connect, vergelijkt vandaag met je gemiddelde van de afgelopen week en geeft één kort coachingsbericht per dag.</p>
<ul>
  <li><strong>Trainingen:</strong> Hartslag, tempo, hartslagzones en rondetijden in eigen grafieken, met de GPS route op een kaart</li>
  <li><strong>Doelen:</strong> Wekelijkse doelen voor training en stappen, met controles op vaste momenten via WorkManager</li>
  <li><strong>Rekenen zonder AI:</strong> Alle berekeningen zijn gewone, geteste Kotlin code. Gemini Nano maakt er alleen een leesbare zin van, met een vaste tekst als terugvaloptie</li>
</ul>

<h3>FoodDrop</h3>
<p>Maak een foto van je maaltijd en de app schat de voedingswaarden. Het resultaat gaat naar Health Connect.</p>
<ul>
  <li><strong>Gemma 3n via MediaPipe:</strong> Een multimodaal model dat afbeeldingen begrijpt en volledig lokaal draait</li>
  <li><strong>Twee modellen:</strong> In de app kies je tussen een sneller en een nauwkeuriger model</li>
  <li><strong>Dagoverzicht:</strong> Calorieën, eiwitten, koolhydraten en vetten afgezet tegen je doelen</li>
</ul>

<h3>Gedeelde opzet</h3>
<p>De apps delen dezelfde lagen: een pure domeinlaag, een datalaag, een AI laag en de UI. Getallen worden altijd zonder AI berekend. Het model is een toevoeging en er is altijd een terugvaloptie als het model ontbreekt. FinDrop en FitDrop hebben een build die faalt zodra de coverage van de logica onder de 80% zakt.</p>
      `,
      image: 'projecten/drop_apps.svg',
      technologies: ['Kotlin', 'Java', 'Jetpack Compose', 'Gemini Nano', 'Gemma 3n', 'MediaPipe', 'Health Connect', 'Room'],
      year: '2026',
    },
    {
      slug: 'kingdom',
      title: 'Kingdom',
      subtitle: 'Koloniesimulatie in Java',
      description: 'Simulatiegame waarin dorpelingen zelfstandig bouwen, oogsten en vechten om hun koning in leven te houden. Met behaviour trees, A* pathfinding en productieketens.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Kingdom is een 2D koloniesimulatie in de geest van RimWorld en Dwarf Fortress. Als speler bestuur je geen poppetjes. Je plaatst bouwplannen en ruimtes zoals een bakkerij, smidse of troonzaal, en geeft aan wat er gekapt, gedolven of gejaagd moet worden. De dorpelingen zoeken zelf uit wie wat doet. Het doel: houd de koning in leven.</p>

<h3>Simulatie</h3>
<ul>
  <li><strong>Behoeften:</strong> Dorst, honger en slaap lopen op. Boven een drempel laat een dorpeling zijn werk vallen om te eten, te drinken of te slapen</li>
  <li><strong>Behaviour trees:</strong> Een compacte eigen implementatie. De selector evalueert elke tick opnieuw, zodat een dringender taak automatisch voorrang krijgt</li>
  <li><strong>Profielen en jobs:</strong> Elke dorpeling heeft een profiel met zestien jobtypes en prioriteiten, van bouwer en smid tot ridder en koning</li>
  <li><strong>Pathfinding:</strong> A* op een grid van 128 bij 128 tegels, met diagonale bewegingen zonder hoeken af te snijden</li>
  <li><strong>Productieketens:</strong> Van tarwe via de opslag naar de bakker en het brood. Gereedschap telt mee, een ridder heeft een zwaard nodig</li>
  <li><strong>Gevechten:</strong> Wolven, bandieten en vijandige ridders. Dorpelingen vluchten, verdedigers vallen aan en de koninklijke garde volgt de koning in formatie</li>
  <li><strong>Wereld:</strong> Terrein gegenereerd met OpenSimplex noise en een dag en nachtcyclus</li>
</ul>

<h3>Architectuur</h3>
<p>De game draait op één thread. Bij versneld spelen tot tien keer de normale snelheid worden er per frame meerdere kleine stappen gezet, zodat beweging en beslissingen kloppen. Ontwerpkeuzes zijn vastgelegd in ADR's en elk systeem heeft eigen documentatie. Een debugpaneel in de game laat live zien welke tak van de behaviour tree een dorpeling uitvoert.</p>

<h3>Technische details</h3>
<ul>
  <li><strong>Engine:</strong> Java 21 met libGDX</li>
  <li><strong>Tests:</strong> JUnit 5, Mockito en AssertJ, met een JaCoCo coverage eis van 80%</li>
  <li><strong>Omvang:</strong> Ruim 120 bronbestanden en ruim 80 testklassen</li>
</ul>
      `,
      image: 'projecten/kingdom.jpg',
      technologies: ['Java 21', 'libGDX', 'Behaviour Trees', 'A* Pathfinding', 'JUnit 5', 'JaCoCo'],
      year: '2026',
    },
    {
      slug: 'floormaster',
      title: 'FloorMaster',
      subtitle: 'Van iPhone scan naar plattegrond',
      description: 'Zet een LiDAR scan van een woning automatisch om in een bewerkbare plattegrond voor Floorplanner en Funda. In ontwikkeling.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Bij elke woning die te koop wordt gezet hoort een plattegrond. Vastgoedfotografen laten die nu vaak met de hand tekenen op basis van een scan, wat een werkdag of langer duurt. FloorMaster automatiseert die stap. Het doel is een complete plattegrond in tien tot vijftien minuten per woning, inclusief een korte handmatige correctie.</p>

<h3>De pipeline</h3>
<ul>
  <li><strong>Scannen:</strong> Een iPhone met LiDAR scant elke verdieping met Apple RoomPlan</li>
  <li><strong>Inlezen:</strong> De backend leest de scan in via drie strikt gescheiden lagen: de scandata, een eigen domeinmodel en het uitvoerformaat. Zo kan de bron later worden vervangen zonder de generator aan te passen</li>
  <li><strong>Geometrie:</strong> Muren worden met de transformatiematrix van RoomPlan naar 2D geprojecteerd. Deuren en ramen worden aan hun muur gekoppeld en op de juiste positie geplaatst</li>
  <li><strong>Uitvoer:</strong> Een .fml bestand voor Floorplanner, met ondersteuning voor meerdere verdiepingen, plus een SVG preview</li>
</ul>

<h3>Uitdagingen</h3>
<p>Het .fml formaat van Floorplanner is niet gedocumenteerd en heb ik zelf ontleed. Scandata is rommelig, dus de pipeline vult ontbrekende waarden zichtbaar aan in plaats van te falen. Omdat er straks twee clients dezelfde plattegrond bewerken, heeft elk element een stabiel ID en gebruiken opslagacties optimistic locking. De laatste vijf versies worden bewaard, zodat elke wijziging terug te draaien is.</p>

<h3>Status</h3>
<p>De backend pipeline van scan naar .fml werkt en is gedekt met 65 tests. De iOS scanapp en de Angular editor voor correcties zijn de volgende stappen.</p>

<h3>Technische details</h3>
<ul>
  <li><strong>Backend:</strong> Java 21, Spring Boot 3, PostgreSQL en Flyway</li>
  <li><strong>Kwaliteit:</strong> JUnit 5, AssertJ, Mockito en JaCoCo, met ontwerpkeuzes vastgelegd in tien ADR's</li>
  <li><strong>Gepland:</strong> Swift app met RoomPlan en een Angular 21 editor</li>
</ul>
      `,
      image: 'projecten/floormaster.svg',
      technologies: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Flyway', 'Apple RoomPlan', 'SVG'],
      year: '2026',
    },
    {
      slug: 'arena2',
      title: 'Arena2',
      subtitle: 'Realtime multiplayer quiz',
      description: 'Multiplayer quiz over Java waarin spelers live tegen elkaar strijden. Met lobby, rondetimer, stemmen voor de volgende ronde en een live scorebord.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Arena2 is een realtime quizgame over Java. Een host maakt een lobby aan, anderen doen mee met alleen een bijnaam. De host kiest onderwerpen uit zo'n veertig Java thema's, zoals Streams, Generics en Records, en het aantal rondes. Daarna strijdt iedereen live tegen elkaar.</p>

<h3>Spelverloop</h3>
<ul>
  <li><strong>Rondes:</strong> Elke ronde heeft open en meerkeuzevragen, met een timer die de server bepaalt zodat iedereen dezelfde tijd heeft</li>
  <li><strong>Direct beoordeeld:</strong> Antwoorden worden op de achtergrond beoordeeld en omgezet in punten. Een ronde stopt vroeg zodra iedereen heeft geantwoord</li>
  <li><strong>Stemmen:</strong> Spelers stemmen voor de volgende ronde. Boven de helft start een korte countdown terwijl de volgende vragen alvast worden opgehaald</li>
  <li><strong>Uitleg:</strong> Na elke vraag volgt uitleg in Markdown met codehighlighting</li>
  <li><strong>Opnieuw verbinden:</strong> Valt je verbinding weg, dan haalt de app de actuele spelstatus op en speel je verder</li>
</ul>

<h3>Techniek</h3>
<p>De backend stuurt alle spelgebeurtenissen via WebSockets met STOMP naar aparte topics voor de lobby, resultaten, stemmen en de countdown. Elke speler krijgt zijn eigen resultaat via een persoonlijk kanaal. De frontend houdt de spelstatus bij met Angular Signals.</p>

<h3>Technische details</h3>
<ul>
  <li><strong>Backend:</strong> Java 21 met Spring Boot 4, WebSockets (STOMP) en PostgreSQL</li>
  <li><strong>Frontend:</strong> Angular 21 met Signals, STOMP.js en Markdown rendering</li>
  <li><strong>Hosting:</strong> Frontend op Vercel, backend op Railway</li>
</ul>
      `,
      image: 'projecten/arena2.svg',
      technologies: ['Spring Boot 4', 'Java 21', 'WebSockets', 'STOMP', 'Angular 21', 'PostgreSQL'],
      year: '2026',
    },
    {
      slug: 'claudeblok',
      title: 'ClaudeBlok',
      subtitle: 'Desktop app voor Claude Code',
      description: 'Windows app om Claude Code in tabbladen te draaien, met lokale spraakherkenning en een gloeiende rand zodra Claude een vraag heeft of klaar is.',
      detailedDescription: `
<h3>Over het project</h3>
<p>Wie met meerdere AI agents tegelijk werkt, mist snel dat er eentje op antwoord wacht. ClaudeBlok is een Windows app die Claude Code in tabbladen draait en laat zien wat elke sessie doet. Heeft Claude een vraag, dan pulseert de rand van het venster oranje. Is hij klaar, dan wordt de rand blauw en paars.</p>

<h3>Functionaliteiten</h3>
<ul>
  <li><strong>Statusgloed:</strong> Een pulserende rand met geluid, per tabblad, voor vraag en klaar</li>
  <li><strong>Spraak naar tekst:</strong> Met een sneltoets spreek je je prompt in. De tekst komt in de invoer zonder te versturen, zodat je hem eerst kunt aanpassen</li>
  <li><strong>Model en effort:</strong> Per tabblad te kiezen. Bij een wissel herstart de sessie en gaat hij verder waar hij was</li>
  <li><strong>Wijzigingenvenster:</strong> Een diff naast elkaar van de laatste beurt of alles sinds de laatste commit</li>
  <li><strong>Tabbladen herstellen:</strong> Bij de volgende start komen alle sessies terug</li>
</ul>

<h3>Hoe het werkt</h3>
<p>Elk tabblad is een volwaardige terminal (JediTerm met pty4j). ClaudeBlok start Claude Code met eigen hooks die gebeurtenissen melden aan een kleine lokale HTTP server, beveiligd met een willekeurig token. Zo weet de app precies wanneer Claude werkt, een vraag stelt of klaar is. Spraakherkenning draait volledig lokaal met whisper.cpp, Nederlands standaard. De gloed is een eigen Swing overlay die met 30 frames per seconde pulseert.</p>

<h3>Technische details</h3>
<ul>
  <li><strong>Desktop:</strong> Java 21, Swing met FlatLaf, JediTerm en pty4j</li>
  <li><strong>Spraak:</strong> whisper.cpp via whisper JNI, volledig offline</li>
  <li><strong>Distributie:</strong> Een losse .exe met eigen Java runtime via jpackage</li>
  <li><strong>Kwaliteit:</strong> Ruim 200 tests en een JaCoCo coverage eis van 80%</li>
</ul>
      `,
      image: 'projecten/claudeblok.svg',
      technologies: ['Java 21', 'Swing', 'JediTerm', 'pty4j', 'whisper.cpp', 'jpackage'],
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
