import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import {ParticleBackgroundComponent} from './components/homepage/effect';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ParticleBackgroundComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}

