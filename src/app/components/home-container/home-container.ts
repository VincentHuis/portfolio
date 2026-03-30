import {Component} from '@angular/core';
import {Homepage} from '../homepage/homepage';
import {Projecten} from '../projecten/projecten';

@Component({
  selector: 'app-home-container',
  imports: [Homepage, Projecten],
  templateUrl: './home-container.html',
  styleUrl: './home-container.css',
})
export class HomeContainer {}
