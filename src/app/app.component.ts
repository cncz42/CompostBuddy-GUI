import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {CameraVideoComponent} from './camera-video/camera-video.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingComponent, CameraVideoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CompostBuddy';
}
