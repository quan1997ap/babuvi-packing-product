import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {

  notificationDetail = null;
  constructor(
    public dialogRef: MatDialogRef<NotificationDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.notificationDetail =  data;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
