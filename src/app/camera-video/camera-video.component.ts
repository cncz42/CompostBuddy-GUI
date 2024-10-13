import {ChangeDetectionStrategy, Component, Input, NgModule} from "@angular/core";
import {CameraButtonComponent} from './camera-button/camera-button.component';
import {WebcamModule} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

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

export class CameraVideoComponent {
  private trigger: Subject<void> = new Subject<void>();
  public webcamImage: WebcamImage = null;
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 393},
    height: {ideal: 852}
  };


  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }
}
