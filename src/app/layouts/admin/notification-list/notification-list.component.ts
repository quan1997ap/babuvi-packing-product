import { NotificationSourceService } from './../notification-detail/refresh-notification.service';
import { NotificationDetailComponent } from './../notification-detail/notification-detail.component';
import { UserService } from "app/services/user.service";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.scss"],
  providers: [UserService],
})
export class NotificationListComponent implements OnInit {
  turnOffNotification = false;
  lstNotification = [];
  loading = true;
  error = false;
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<NotificationListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private notificationSourceService: NotificationSourceService
  ) {}

  ngOnInit() {
    // this.getUserNotification();
    this.lstNotification = this.data.lstNotification;
    this.loading = false;
    this.error = false;
  }

  getUserNotification() {
    this.error = false;
    this.loading = true;
    this.userService.getLsNotification().subscribe(
      (resNotification) => {
        this.lstNotification = resNotification.result.data;
        this.loading = false;
        this.error = false;
      },
      (error) => {
        this.loading = false;
        this.error = true;
      }
    );
  }

  notificationSetting($event) {
    // settingValue = 1 ---> hiển thị popup
    // settingValue = 2 --> không hiển thị popup
    if ($event.checked == true) {
      this.userService.turnOffNotification().subscribe((turnOffRes) => {
        this.userService.saveNotificationStatus("2");
      });
    } else {
      this.userService.turnOnNotification().subscribe((turnOnRes) => {
        this.userService.saveNotificationStatus("1");
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  showDetailNotification(notification, i ){

    if(notification.showType == '2'){
      let dialogRef = this.dialog.open(NotificationDetailComponent, {
        width: "600px",
        data: notification,
      });
      dialogRef.afterClosed().subscribe((res) => {
        this.lstNotification[i].status = 2;
      });
    } else if(notification.showType == '1'){
      this.lstNotification[i].status = 2;
      this.userService
      .readNotification(notification.notificationUserId)
      .subscribe((res) => {
        this.notificationSourceService.setNotificationSource( new Date().getTime() );
      });
      window.open(notification.url, '_blank').focus();
    }
  }

}
