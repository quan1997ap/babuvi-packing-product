import { NgModule } from '@angular/core';
import { RouterModule, UrlSerializer } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatGridListModule,
  MatExpansionModule,
  MatChipsModule,
  MatCardModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatToolbarModule,
  MatDialogModule,
  MatProgressSpinnerModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShipManagerRoutes } from './ship-manager.routing';
import { OrdersComponent } from './orders/orders.component';
import { ShipManagerService } from 'app/services/ship-manager.service';
import { OrderDetailService } from 'app/services/order-detail.service';
import { CurrencyFormat } from '../common/pipe-format-money.component';
import { ShareCommonModule } from '../common/share-common.module';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import { MessagesModule } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import { ConfirmDialogComponent } from 'app/common-view/confirm-dialog/confirm-dialog.component';
import { CommonViewModule } from 'app/common-view/common-view.module';
import { CustomUrlSerializer } from './custom-url-serializer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ShipManagerRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    ShareCommonModule,
    MessagesModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    CommonViewModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule
   ],
  declarations: [
    OrdersComponent,
  ],
  providers: [
    ShipManagerService,
    OrderDetailService,
    MessageService,
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
  ],
    entryComponents: []
})

export class ShipManagerModule {}
