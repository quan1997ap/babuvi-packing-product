import { Component, OnInit,ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CommonService } from 'app/services/common.service';
import { ClientProfile } from 'app/model/client-profile.model';
import { WalletByUserId } from 'app/model/wallet-by-userid.model';
import * as _ from 'lodash';
import { TransactionManager } from 'app/model/transaction-manager.model';

@Component({
    selector: 'ms-basic-cards',
    templateUrl:'./basic-card-component.html',
    styleUrls: ['./basic-card-component.scss']
})
export class BasicCardComponent implements OnInit, AfterViewInit {
  
  displayedColumns = ['TotalAmount', 'BlockedAmount', 'AvailableAmount'];
  dataSource = new MatTableDataSource<Element>();
  private account: ClientProfile;
  lstWalletByUserId: WalletByUserId[] = [];
  clientProfile: ClientProfile;
  walletId: number;
  lstTransaction: TransactionManager[] = [];
  picker: any;
  
  constructor(private _commonServices: CommonService) {}

  ngOnInit() {
    this.account = JSON.parse(localStorage.getItem("userData"));
    this.clientProfile = new ClientProfile();
  }
  ngAfterViewInit() {
    this.getAccountUser();
    this.getLsWallet();
  }

  getAccountUser(){
    this._commonServices.getInfoUser(this.account.userId).subscribe( res => {
      this.clientProfile = res['result'].data;
    })
  }

  getLsWallet(){
    var self = this;
    self._commonServices.getLsWallet().subscribe( res => {
      self.lstWalletByUserId = res['result'].data;
      self.walletId = this.lstWalletByUserId[0].walletId;

      const data  = _.filter(this.lstWalletByUserId, function(o) { return o.walletId=== self.walletId });
      if(data) {
        self.dataSource = new MatTableDataSource<Element>();
        self.dataSource.data = data;
      }
    })
  }

  onFoodSelection2(){
    var self = this;
    const data  = _.filter(this.lstWalletByUserId, function(o) { return (o.walletId+'') === (self.walletId+'') });
    if(data) {
      self.dataSource = new MatTableDataSource<Element>();
      self.dataSource.data = data;
    }
  }
	
}

export interface Element {
  totalAmount: string;
  blockedAmount: string;
  availableAmount: string;
}




