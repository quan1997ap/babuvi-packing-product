import { debounceTime } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { SystemService } from "app/services/system.services";
import { CollaborationServices } from "./../../services/collaboration.services";
import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { combineLatest, pipe } from "rxjs";
import { Subscription } from 'rxjs/Subscription';
import { Paginator } from 'primeng/paginator';
import { DialogService } from 'primeng/api';
import * as moment from 'moment';

// Components
import { CollaborationDetailComponent } from './../collaboration-detail/collaboration-detail.component';

export interface Collaboration{
  endDate: string;
  lsBanner: any[];
  name: string;
  referralCode: any;
  referralProgramId: number;
  referralProgramUserId: number;
  shareUrl: string;
  startDate: string;
  status: string;
  statusDisplay: string;
  subTitle:string;
  temp: string;
  thumbUrl: string;
  title: string;
  userId: string;
  userStatus: string;
  userStatusDisplay: string;
}

@Component({
  selector: "app-collaboration-list",
  templateUrl: "./collaboration-list.component.html",
  styleUrls: ["./collaboration-list.component.scss"],
})
export class CollaborationListComponent implements OnInit, OnDestroy  {
  filterForm: FormGroup;
  collaborations: any[];
  totalCollaborations = 0;
  referralProgramUserStatus= [];
  referralProgramStatus: [];
  isLoading = true;
  hasError = false;
  pageSize = 10;
  pageIndex = 1;
  @ViewChild('paginator') paginator: Paginator;
  private subscriptions = new Subscription();
  constructor(
    private collaborationServices: CollaborationServices,
    private systemService: SystemService,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getMappingData();
  }

  initForm() {
    this.filterForm = new FormGroup({
      title: new FormControl(""),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      status: new FormControl(null),
      userStatus : new FormControl(null),
    });
  }

  searchCollaboration(){
    let querySearch = new Object({});
    let formVal = this.filterForm.value;
    for( let key of Object.keys(formVal)) {
      if(formVal[key] != null && formVal[key] != ''){
        if( key == 'startDate' ){
          querySearch['startDate'] = moment( new Date(formVal.startDate)).format('YYYY-MM-DD') + 'T00:00:00';
        } else if( key == 'endDate'){
          querySearch['endDate'] = moment( new Date(formVal.endDate)).format('YYYY-MM-DD') + 'T00:00:00';
        }  else if( key == 'status'){
          querySearch['status'] = formVal['status'].value;
        } else {
          querySearch[key] = formVal[key];
        }
      }
    }
    this.filterCollaboration(querySearch);
  }

  filterCollaboration(querySearch) {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    this.isLoading = true;
    this.hasError = false;
    this.collaborations = [];
    this.subscriptions.add(this.collaborationServices
      .searchReferralProgram(querySearch, this.pageIndex, this.pageSize)
      .subscribe((resCollaborations) => {
        if (resCollaborations.result.success == true) {
          this.collaborations = resCollaborations.result.data.lsData;
          this.totalCollaborations = resCollaborations.result.data.dataCount;
        } else {
          this.totalCollaborations = 0;
        }
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        this.hasError = true;
      } )
    );
  }

  getMappingData() {
    combineLatest(
      this.systemService.getReferralProgramStatus(),
      this.systemService.getReferralProgramUserStatus()
    ).subscribe( res => {
      this.referralProgramStatus= res[0].map( item => ({ label: item.displayValue , value: item.code }));
      this.referralProgramUserStatus = res[1].map( item => ({ label: item.displayValue , value: item.code }));
      this.referralProgramUserStatus.unshift({label: 'Tất cả', value: null} )
      this.initForm();
      this.filterForm.patchValue(
        {
          userStatus: this.referralProgramUserStatus[0].value
        }
      );
      this.searchCollaboration();
      this.filterForm.get("userStatus").valueChanges.pipe( debounceTime(1000) ).subscribe(userStatus => {
        this.searchCollaboration();
      })
    }, err => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Không lấy được dữ liệu'});
    })
  }

  paginate(event) {
    this.pageIndex = event.page + 1;
    this.searchCollaboration();
    console.log(this.pageIndex)
  }

  viewDetail(collaboration: Collaboration){
    const refDetail = this.dialogService.open(CollaborationDetailComponent , {
      header: 'Thông tin chương trình',
      width: '96%',
      height: "96%",
      style: { "max-height": "900px", "max-width": "1200px"},
      data: collaboration
    });

    refDetail.onClose.subscribe((car) => {
      if (car) {
      }
     }
    )
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
