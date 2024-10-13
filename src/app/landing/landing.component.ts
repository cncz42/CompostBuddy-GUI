import { Component } from '@angular/core';
import {CameraComponent} from './camera/camera.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CameraComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
