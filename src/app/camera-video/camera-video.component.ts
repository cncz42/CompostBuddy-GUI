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
  //old ah js function I found to do this oddly specific thing
  handleCapturedImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
    const arr = this.webcamImage.imageAsDataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], "pain.png", { type: "image/png" });

  }

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
    let file = this.handleCapturedImage(webcamImage);
    let formData = new FormData();
    formData.append('image', file, file.name);

    fetch("localhost:5000/upload", {
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

    this.router.navigate(['/results']);
  }
}
