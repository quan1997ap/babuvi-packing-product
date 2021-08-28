import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ClipboardService } from "ngx-clipboard";
import { DynamicDialogConfig, DynamicDialogRef, MessageService } from "primeng/api";
import { CollaborationServices } from "./../../services/collaboration.services";
import { Collaboration } from "./../collaboration-list/collaboration-list.component";
@Component({
  selector: "app-collaboration-detail",
  templateUrl: "./collaboration-detail.component.html",
  styleUrls: ["./collaboration-detail.component.scss"],
})
export class CollaborationDetailComponent implements OnInit {
  @ViewChild("copyShareUrl") copyShareUrl: any;
  currentCollaboration: Collaboration;
  viewBanner = false;
  isLoading = false;
  listBanner = [];
  groups: any[] = [];
  loadBannerError = false;
  timeoutUpdateClickReferralLink: any;
  disableCopyBtn = false;

  constructor(
    private collaborationServices: CollaborationServices,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _clipboardService: ClipboardService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.collaborationServices
      .getReferralProgram(config.data.referralProgramUserId)
      .subscribe((res) => {
        this.currentCollaboration = {
          ...res.result.data,
          ...{ statusDisplay: config.data.statusDisplay },
        };
        this.currentCollaboration.shareUrl += `?referralCode=${this.currentCollaboration.referralCode}`;
      });
  }

  ngOnInit() {}

  close() {
    this.ref.close();
  }

  copy(text: string) {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Copy Link Success",
    });
  }

  copyImgUrl() {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Copy Link Success",
    });
  }

  downloadImg(banner) {
    this.http.get(banner.url, { responseType: "blob" }).subscribe(
      (val) => {
        // console.log(val);
        const url = URL.createObjectURL(val);
        this.downloadUrl(url, "image.png");
        URL.revokeObjectURL(url);
      },
      (error) => {
        // console.log(error);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Không tải xuống được ảnh. Bạn có thể tải xuống thủ công bằng cách nhấn chuột phải => 'Save Image as...' ",
        });
      }
    );
  }

  downloadUrl(url: string, fileName: string) {
    const a: any = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = "display: none";
    a.click();
    a.remove();
  }

  viewListBanner(banner) {
    this.viewBanner = true;
    this.getBannerDesign(banner.programBannerId);
  }
  cancelViewBanner() {
    this.viewBanner = false;
  }

  getBannerDesign(bannerId) {
    this.isLoading = true;
    this.loadBannerError = false;
    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    }

    this.collaborationServices.getLsBannerDesignByBannerId(bannerId).subscribe(
      (res) => {
        this.listBanner = res.result.data;
        this.listBanner = this.listBanner.sort( (imgA, imgB) => Number(imgB.status) - Number(imgA.status) );
        // console.log(this.listBanner);
        this.groups = this.listBanner.map( item => item.groupRow ).filter(unique).sort( (a,b) => a -b )
        console.log(this.groups)
        this.isLoading = false;
        this.loadBannerError = false;
      },
      (error) => {
        this.isLoading = false;
        this.loadBannerError = true;
      }
    );
  }
}
