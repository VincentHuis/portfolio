import {Routes} from '@angular/router';
import {HomeContainer} from './components/home-container/home-container';
import {VoicedropPrivacy} from './components/voicedrop-privacy/voicedrop-privacy';

export const routes: Routes = [
  { path: '', component: HomeContainer },
  {path: 'voicedrop/privacy', component: VoicedropPrivacy},
];
