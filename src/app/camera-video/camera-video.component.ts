import {ChangeDetectionStrategy, Component, Input, NgModule} from "@angular/core";
import {CameraButtonComponent} from './camera-button/camera-button.component';
import {WebcamModule} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

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
  constructor(private sharedService: SharedService, private router: Router) {}
  private trigger: Subject<void> = new Subject<void>();
  public webcamImage: WebcamImage = null;
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 393},
    height: {ideal: 852}
  };

  sendData(image: WebcamImage, compostable: boolean, name: string): void {
    this.sharedService.setStatus(compostable);
    this.sharedService.setName(name);
    this.sharedService.setImage(image);
  }


  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.sharedService.setImage(webcamImage);
    let image = webcamImage.imageData

    // shout out chatGPT for this JANK image conversion but JS is weird like that
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(image, 0, 0);

    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('image', blob, (Math.random() + 1).toString(36).substring(7) +'.png');

      fetch("http://localhost:5000", {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          this.sharedService.setStatus(data.compostable);
          this.sharedService.setName(data.message);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, 'image/png');
    this.router.navigate(['/results']);
  }
}
