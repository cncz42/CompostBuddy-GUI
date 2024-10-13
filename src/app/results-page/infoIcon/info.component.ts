import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {NgClass, NgIf} from '@angular/common';
@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgClass
  ],
  standalone: true
})
export class InfoComponent {
  @Input() size: "20" | "24" | "32" | "40" | "48" | "16" = "48";
}
