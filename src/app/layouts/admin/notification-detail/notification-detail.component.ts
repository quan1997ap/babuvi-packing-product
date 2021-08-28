import { NotificationSourceService } from './refresh-notification.service';
import { UserService } from "app/services/user.service";
import { MatDialogRef } from "@angular/material";
import { Component, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";

@Component({
  selector: "app-notification-detail",
  templateUrl: "./notification-detail.component.html",
  styleUrls: ["./notification-detail.component.scss"],
  providers: [UserService],
})
export class NotificationDetailComponent implements OnInit {
  notificationDetail = null;
  constructor(
    public dialogRef: MatDialogRef<NotificationDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private notificationSourceService: NotificationSourceService
  ) {
    this.notificationDetail = data;
    if (this.notificationDetail.status == 1) {
      this.userService
        .readNotification(this.notificationDetail.notificationUserId)
        .subscribe((res) => {
          this.notificationSourceService.setNotificationSource( new Date().getTime() );
        });
    }
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
}
