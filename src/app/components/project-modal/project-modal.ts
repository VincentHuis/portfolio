import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  image: string;
  technologies: string[];
  year: string;
  link?: string;
}

@Component({
  selector: 'app-project-modal',
  standalone: true,
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.css',
  animations: [
    trigger('backdrop', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms ease-out', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({opacity: 0})),
      ]),
    ]),
    trigger('panel', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(40px) scale(0.97)'}),
        animate('300ms cubic-bezier(0.22, 1, 0.36, 1)', style({opacity: 1, transform: 'translateY(0) scale(1)'})),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: 0, transform: 'translateY(20px) scale(0.98)'})),
      ]),
    ]),
  ],
})
export class ProjectModalComponent {
  @Input() project: ProjectDetail | null = null;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
