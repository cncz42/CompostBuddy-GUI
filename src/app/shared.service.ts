import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {WebcamImage} from 'ngx-webcam';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private nameSubject: ReplaySubject<string> = new ReplaySubject<string>(1);
  private statusSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private imageSubject: ReplaySubject<WebcamImage> = new ReplaySubject<WebcamImage>(1);

  setName(data: string): void {
    this.nameSubject.next(data);
  }

  getName$(): Observable<string> {
    return this.nameSubject.asObservable();
  }

  setStatus(data: boolean): void {
    this.statusSubject.next(data);
  }

  getStatus$(): Observable<boolean> {
    return this.statusSubject.asObservable();
  }

  setImage(data: WebcamImage): void {
    this.imageSubject.next(data);
  }

  getImage$(): Observable<WebcamImage> {
    return this.imageSubject.asObservable();
  }
}
