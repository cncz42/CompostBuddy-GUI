import {ChangeDetectionStrategy, Component, Input, NgModule} from "@angular/core";
import {CameraButtonComponent} from './camera-button/camera-button.component';
import {WebcamModule} from 'ngx-webcam';


@Component({
  selector: "app-camera-video",
  templateUrl: "./camera-video.component.html",
  styleUrls: ["./camera-video.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CameraButtonComponent,
    WebcamModule
  ],
  standalone: true
})

export class CameraVideoComponent {}
