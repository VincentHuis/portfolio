import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-voicedrop-privacy',
  standalone: true,
  templateUrl: './voicedrop-privacy.html',
  styleUrl: './voicedrop-privacy.css',
})
export class VoicedropPrivacy {
  constructor(title: Title) {
    title.setTitle('Privacybeleid VoiceDrop');
  }
}
