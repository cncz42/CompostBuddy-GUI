import { Routes } from '@angular/router';
import {CameraVideoComponent} from './camera-video/camera-video.component';
import {LandingComponent} from './landing/landing.component';

export const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'camera', component: CameraVideoComponent },
];
