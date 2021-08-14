import { MessageService } from "primeng/api";
import { SystemService } from "app/services/system.services";
import { CollaborationServices } from "./../../services/collaboration.services";
import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnDestroy, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { DialogService } from "primeng/api";
import * as moment from 'moment';
import { Table } from "primeng/table";

@Component({
  selector: "app-collaboration-statistics",
  templateUrl: "./collaboration-statistics.component.html",
  styleUrls: ["./collaboration-statistics.component.scss"],
})
export class CollaborationStatisticsComponent implements OnInit {

  @ViewChild('dtLarge') private dataTableLarge: Table;
  @ViewChild('dtSmall') private dataTableSmall: Table;

  filterForm: FormGroup;
  isLoading = false;
  hasError = false;
  lsReferralProgram = [];

  lsCommissionRequestPayment = [];
  lsReferralOrder: any = {}; // dataCount: number; pageCount: number; lsData: any[]
  referralProgramUser: any = {};
  statistic = {};
  pageSize = 1000;
  pageIndex = 1;


  constructor(
    private collaborationServices: CollaborationServices,
    private systemService: SystemService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.filterForm = new FormGroup({
      dateRange: new FormControl(null),
      referralProgramUserId: new FormControl(null),
      referralOrderStatus: new FormControl(null),
    });

    this.collaborationServices.getLsReferralProgramByUser().subscribe(
      (res) => {
        this.lsReferralProgram = res.result.data;
        this.searchReferralProgramUser();
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Không lấy được dữ liệu ",
        });
      }
    );
  }

  searchReferralProgramUser() {
    this.isLoading = true;
    // reset
    this.lsReferralOrder = {};
    this.lsReferralOrder["countAccept"] = 0;
    this.lsReferralOrder["countWait"] = 0;
    this.lsReferralOrder["countCancel"] = 0;
    this.lsReferralOrder["countAll"] = 0;

    this.referralProgramUser = null;

    let formVal = this.filterForm.getRawValue();
    let querySearch: any = {};

    if (formVal.dateRange) {
      querySearch["startDate"] = moment( new Date(formVal.dateRange[0])).format('YYYY-MM-DD') + 'T00:00:00';
      querySearch["endDate"] = moment( new Date(formVal.dateRange[1])).format('YYYY-MM-DD') + 'T00:00:00';
    } else if (formVal.referralProgramUserId != null) {
      querySearch["referralProgramUserId"] = formVal.referralProgramUserId.referralProgramUserId;
    }
    this.collaborationServices
      .searchReferralProgramUser(querySearch, this.pageSize, this.pageIndex)
      .subscribe(
        (res) => {
          this.statistic = res.result.data;
          this.lsCommissionRequestPayment =
            res.result.data.lsCommissionRequestPayment;
          this.referralProgramUser = res.result.data.referralProgramUser;

          this.lsReferralOrder["countAccept"] = 0;
          this.lsReferralOrder["countWait"] = 0;
          this.lsReferralOrder["countCancel"] = 0;
          this.lsReferralOrder["countAll"] = 0;
          if (
            res.result.data.lsReferralOrder &&
            res.result.data.lsReferralOrder.lsData.length
          ) {
            this.lsReferralOrder = res.result.data.lsReferralOrder;
            this.lsReferralOrder.groupStatus = this.lsReferralOrder.groupStatus.sort( (a, b) => {
              return a.ord - b.ord;
            });

           
          }

          this.isLoading = false;
          this.cdr.detectChanges();
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.result.message,
          });
          this.isLoading = false;
        }
      );
  }


  filterTableByStatus(status){
    this.dataTableLarge.filter(status, 'status', 'equals' );
    this.dataTableSmall.filter(status, 'status', 'equals' );

  }


  ngOnDestroy() {}
}
