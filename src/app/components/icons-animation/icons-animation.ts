import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icons-animation',
  imports: [CommonModule],
  templateUrl: './icons-animation.html',
  styleUrl: './icons-animation.css',
})
export class IconsAnimation {
  icons = [
    'ab-testing.png',
    'ads.png',
    'api.png',
    'app-development.png',
    'cloud-computing.png',
    'coding.png',
    'file-transfer.png',
    'javascript.png',
    'loading.png',
    'web-development.png'
  ];
}
