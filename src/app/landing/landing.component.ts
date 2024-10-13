import { Component } from '@angular/core';
import {CameraComponent} from './camera/camera.component';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CameraComponent,
    RouterLink
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
}
