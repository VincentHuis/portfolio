# Qwest

**Subtitle:** D&D Campaign Tool
**Slug:** qwest
**Image:** projecten/qwest.png
**Year:** 2026
**Technologies:** Spring Boot, Spring AI, Angular, Java 21, WebSockets, JWT, WebAuthn, MySQL, Liquibase, TypeScript, CI/CD

## Korte beschrijving

Een webapplicatie waarmee je Dungeons & Dragons campagnes digitaal beheert en speelt. Gebouwd met Angular en Spring Boot, inclusief realtime chat, dice rolling, AI gestuurde NPC's via Spring AI en een uitgebreid permissiesysteem.

## Uitgebreide beschrijving

### Over het project

Qwest is een fullstack webapplicatie waarmee je Dungeons & Dragons campagnes digitaal beheert en speelt. Het project is gebouwd als een ambitieuze oefening in complexe architectuur, realtime communicatie, security en AI integratie. De applicatie draait op Angular aan de frontend en Spring Boot aan de backend.

### Campaigns en sessions

Een Game Master kan campagnes aanmaken, spelers uitnodigen en sessions plannen, starten en stoppen. Binnen een sessie beschikt iedereen over een realtime chatsysteem dat is gebouwd op WebSockets (STOMP). Het chatsysteem ondersteunt commando's zoals **/roll** voor dice rolls met modifiers (bijvoorbeeld 2d6+3), **/session** voor sessiebeheer en **/kick** om spelers te verwijderen. Berichten hebben visibility levels: sommige berichten zijn alleen zichtbaar voor de GM, andere voor iedereen.

### Characters en NPC's

Spelers kunnen hun eigen characters aanmaken met volledige stats (STR, DEX, CON, etc.) inclusief automatisch berekende modifiers. Voor de GM zijn er NPC templates waarmee snel nieuwe NPC instances aangemaakt kunnen worden. Zowel characters als NPC's kunnen afbeeldingen hebben die via de backend worden opgeslagen.

### AI NPC's met Spring AI

Een van de meest experimentele features is de integratie van AI gestuurde NPC's via Spring AI. NPC's kunnen reageren in de chat op basis van hun karakter, achtergrondverhaal en de context van het gesprek. Dit maakt het mogelijk om als GM geautomatiseerde, in character reacties te krijgen van NPC's, wat de immersie van het spel versterkt.

### Security

De applicatie maakt gebruik van stateless JWT authenticatie via Spring Security. Daarnaast is WebAuthn (passkeys) geïntegreerd als moderne inlogmethode. Het permissiesysteem is fijnmazig opgezet: GM only acties zijn afgeschermd en bij elke actie wordt gecontroleerd of de gebruiker lid is van de betreffende campaign.

### Samenwerken

Het project is ontwikkeld in teamverband met een gedeelde GitLab repository, CI/CD pipelines en code reviews. De samenwerking richtte zich op het verdelen van features, het reviewen van elkaars code en het samen oplossen van complexe technische vraagstukken rondom realtime communicatie en security.

### Technische details

- **Backend:** Java 21 met Spring Boot, Spring Security, Spring AI en WebSockets (STOMP)
- **Frontend:** Angular 21 met TypeScript
- **Database:** MySQL met Liquibase voor migraties
- **Security:** JWT (stateless) en WebAuthn (passkeys)
- **Realtime:** WebSockets via STOMP protocol
- **Command parsing:** Regex based input handling voor dice syntax en chat commando's

### Doel

Qwest is niet primair een commercieel product, maar een project om diepgaand te leren over complexe architectuur, security, realtime communicatie en AI integratie binnen een fullstack applicatie. Het digitaliseren van D&D gameplay was daarbij de perfecte context om al deze technologieën samen te brengen in één ambitieus geheel.
