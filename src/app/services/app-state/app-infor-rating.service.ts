import { Subject } from "rxjs";
import { SystemService } from "./../system.services";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

// https://stackoverflow.com/questions/49387889/passing-data-with-subjects-and-proxies
@Injectable({
  providedIn: "root",
})
export class AppInforRatingService {
  private appInforRatingSub: BehaviorSubject<any>;
  private appInforRatingEvent: any;

  constructor(private systemService: SystemService) {
    this.appInforRatingSub = new BehaviorSubject<any>({});
    this.appInforRatingEvent = this.appInforRatingSub.asObservable();
  }

  subscribeChangeRatingInforEvent(next, err?, complete?) {
    return this.appInforRatingEvent.subscribe(next, err, complete);
  }

  getNewInfor() {
    let account = JSON.parse(localStorage.getItem("userData"));
    let userId = account.userId;
    this.systemService.getInfoRating(userId).subscribe(
      (res) => {
        if (res.result.success) {
          localStorage.setItem("ratingInfo", JSON.stringify(res.result.data));
          this.appInforRatingSub.next(res.result.data);
        } else {
          console.log("can't get InfoRating");
        }
      },
      (err) => {}
    );
  }
}
