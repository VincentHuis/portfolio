import {Component} from '@angular/core';
import {Homepage} from '../homepage/homepage';
import {Projecten} from '../projecten/projecten';
import {OverMij} from '../over-mij/over-mij';
import {Contact} from '../contact/contact';

@Component({
  selector: 'app-home-container',
  imports: [Homepage, Projecten, OverMij, Contact],
  templateUrl: './home-container.html',
  styleUrl: './home-container.css',
})
export class HomeContainer {}
