import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {NgClass, NgIf} from '@angular/common';
@Component({
  selector: "app-camera-button",
  templateUrl: "./camera-button.component.html",
  styleUrls: ["./camera-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgClass
  ],
  standalone: true
})
export class CameraButtonComponent {
  @Input() size: "20" | "24" | "32" | "40" | "48" | "16" = "48";
}
