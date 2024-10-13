import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {NgClass, NgIf} from '@angular/common';
@Component({
  selector: "app-camera",
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgClass
  ],
  standalone: true
})
export class CameraComponent {
  @Input() size: "20" | "24" | "32" | "40" | "48" | "16" = "48";
}
