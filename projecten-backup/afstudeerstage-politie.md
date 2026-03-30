# Afstudeerstage

**Subtitle:** Innovatiehuis Politie Noord-Nederland
**Slug:** afstudeerstage-politie
**Image:** companys/politie_logo.png
**Featured:** true
**Year:** 2025
**Technologies:** Python, Raspberry Pi, NFC / RFID, Magneetstrip, OCR, Computer Vision, Hardware Integration, Embedded Systems, Security, Data Encryption, Local Data Storage, Agile / Scrum, Prototyping

## Korte beschrijving

Ontwikkeling van een modulaire paslezer voor de financiële recherche. De paslezer kan data uitlezen van creditcards, bankpassen, cryptokaarten, cadeaukaarten en identiteitsdocumenten zoals ID en paspoort. Dit gebeurt via NFC, magneetstrip en camera.

## Uitgebreide beschrijving

### Over het project

Het is vroeg in de ochtend wanneer de financiële recherche een woning binnenvalt na maanden van onderzoek. In de woonkamer liggen meerdere bankpassen, prepaidkaarten, cadeaukaarten en een identiteitsdocument verspreid op tafel. Elke minuut telt: betaalrekeningen kunnen op afstand worden geblokkeerd, cryptowallets kunnen leeggehaald worden en cruciale sporen kunnen verloren gaan. Om effectief te handelen moeten rechercheurs direct inzicht krijgen in welke kaarten actief zijn, welke technologie ze gebruiken en welke data erop aanwezig is.

Voor mijn afstudeerstage bij het Innovatiehuis Politie Noord-Nederland heb ik een universele, modulaire paslezer ontwikkeld die speciaal is ontworpen voor gebruik tijdens huiszoekingen en onderzoeken. Het doel van dit systeem is om rechercheurs ter plaatse, zonder gespecialiseerde technische kennis, snel en gecontroleerd kaartgegevens te laten uitlezen.

### Functionele mogelijkheden

De paslezer is ontworpen als één geïntegreerd systeem dat meerdere uitleestechnologieën combineert. Hierdoor kunnen verschillende kaarttypen binnen één workflow worden verwerkt:

- **NFC / RFID:** Ondersteuning voor contactloze kaarten zoals debit- en creditcards (ISO 14443), OV-chipkaarten en andere smartcards. De lezer detecteert automatisch het kaarttype en leest beschikbare kaartinformatie uit zonder fysieke interactie.
- **Magneetstrip:** Uitlezen van alle drie de magneetstrip-tracks, waardoor ook oudere bankpassen, cadeaukaarten en prepaidkaarten kunnen worden geanalyseerd.
- **Visuele identificatie (camera + OCR):** Met behulp van een camera en OCR-technologie worden identiteitskaarten en paspoorten gescand. Tekstvelden worden automatisch herkend en omgezet naar gestructureerde data.

### Architectuur en technische opzet

Het systeem is modulair opgebouwd, waarbij iedere uitleestechniek is geïmplementeerd als een afzonderlijke softwaremodule. Deze modules communiceren via een centrale applicatielaag, waardoor nieuwe kaarttypen of uitleesmethoden eenvoudig toegevoegd kunnen worden zonder impact op bestaande functionaliteit.

De hardware is gebaseerd op een Raspberry Pi, gekoppeld aan gespecialiseerde kaartlezers. De software is ontwikkeld in Python vanwege de sterke ondersteuning voor hardware-interactie en de beschikbaarheid van gespecialiseerde libraries voor NFC, magneetstrip en OCR.

De gebruikersinterface is bewust eenvoudig gehouden en gericht op snelheid en duidelijkheid. Rechercheurs krijgen direct feedback over het gedetecteerde kaarttype en de beschikbare informatie, zonder geconfronteerd te worden met technische details.

### Beveiliging en betrouwbaarheid

Omdat het systeem wordt ingezet binnen strafrechtelijk onderzoek, is beveiliging een essentieel onderdeel van het ontwerp. Alle uitgelezen gegevens worden lokaal opgeslagen en versleuteld. Er vindt geen externe communicatie plaats, waardoor het risico op datalekken wordt geminimaliseerd.

Daarnaast is er nadrukkelijk rekening gehouden met de juridische betrouwbaarheid van de data. Het systeem is ontworpen om aantoonbaar alleen informatie uit te lezen die daadwerkelijk op de kaart aanwezig is, zonder deze te manipuleren. Dit is van belang om de data te kunnen gebruiken als ondersteunend bewijsmateriaal.

### Ontwikkelproces en validatie

De ontwikkeling vond plaats volgens een Agile-werkwijze, met korte iteraties en regelmatige feedbackmomenten met de financiële recherche. Hierdoor kon het systeem continu worden afgestemd op de praktijk. Verschillende soorten kaarten van diverse uitgevers zijn getest om de compatibiliteit en betrouwbaarheid te valideren.

### Resultaat

Het eindresultaat is een werkend proof-of-concept dat laat zien hoe rechercheurs op locatie sneller inzicht kunnen krijgen in financiële middelen en identiteiten. Door het elimineren van de stap waarbij pasjes eerst naar een gespecialiseerd lab moeten worden gestuurd, wordt kostbare tijd bespaard.

Dankzij de modulaire architectuur is het systeem toekomstbestendig en eenvoudig uit te breiden met nieuwe kaarttechnologieën of analysemethoden. Het project toont mijn vermogen om complexe technische eisen te vertalen naar een praktisch en betrouwbaar systeem binnen een veiligheidskritische omgeving.
