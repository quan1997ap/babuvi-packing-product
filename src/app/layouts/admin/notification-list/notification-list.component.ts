import { NotificationDetailComponent } from './../notification-detail/notification-detail.component';
import { MatDialogRef } from "@angular/material";
import { UserService } from "app/services/user.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

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
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUserNotification();
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

  showDetailNotification(notification){

    if(notification.showType == '2'){
      this.dialog.open(NotificationDetailComponent, {
        width: "600px",
        data: notification
      });
    } else if(notification.showType == '1'){
      window.open(notification.url, '_blank').focus();
    }
  }

}
