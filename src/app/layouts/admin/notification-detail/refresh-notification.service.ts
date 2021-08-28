import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationSourceService {

  private notificationSource = new Subject<number>();

  constructor() { }

  public getNotificationSource(): Observable<number> {
    return this.notificationSource.asObservable();
  }

  public setNotificationSource(time: number) {
    console.log(time)
    return this.notificationSource.next(time);
  }

}