import { Component } from '@angular/core';
import { Homepage } from '../homepage/homepage';
import { OverMij } from '../over-mij/over-mij';
import { Projecten } from '../projecten/projecten';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home-container',
  imports: [Homepage, OverMij, Projecten, Contact],
  templateUrl: './home-container.html',
  styleUrl: './home-container.css',
})
export class HomeContainer {}
