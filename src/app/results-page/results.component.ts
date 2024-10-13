import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {CameraButtonComponent} from '../camera-video/camera-button/camera-button.component';
import {InfoComponent} from './infoIcon/info.component';
import {CameraComponent} from '../landing/camera/camera.component';
import {SharedService} from '../shared.service';
import {WebcamImage} from 'ngx-webcam';
import {Subject, takeUntil} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: "app-i-phone-161",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CameraButtonComponent,
    InfoComponent,
    CameraComponent,
    RouterLink
  ],
  standalone: true
})
export class ResultsComponent {
  image: WebcamImage;
  name: string;
  compostable: boolean;

  private unsubscribe = new Subject<void>();

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.getImage$().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.image = data;
    });
    this.sharedService.getName$().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.name = data;
    });
    this.sharedService.getStatus$().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.compostable = data;
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
