import {Component} from '@angular/core';
import {Homepage} from '../homepage/homepage';
import {Projecten} from '../projecten/projecten';
import {OverMij} from '../over-mij/over-mij';

@Component({
  selector: 'app-home-container',
  imports: [Homepage, Projecten, OverMij],
  templateUrl: './home-container.html',
  styleUrl: './home-container.css',
})
export class HomeContainer {}
