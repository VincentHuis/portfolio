import { Routes } from '@angular/router';
import { HomeContainer } from './components/home-container/home-container';
import { ProjectDetail } from './components/project-detail/project-detail';

export const routes: Routes = [
  { path: '', component: HomeContainer },
  { path: 'project/:slug', component: ProjectDetail }
];
