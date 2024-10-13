import { Routes } from '@angular/router';
import {CameraVideoComponent} from './camera-video/camera-video.component';
import {LandingComponent} from './landing/landing.component';
import {ResultsComponent} from './results-page/results.component';

export const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'camera', component: CameraVideoComponent },
  { path: 'results', component: ResultsComponent }
];
