import { ShareCommonModule } from './../common/share-common.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Component
import { RouterModule, Routes } from "@angular/router";
import { CollaborationListComponent } from "./collaboration-list/collaboration-list.component";
import { CollaborationDetailComponent } from "./collaboration-detail/collaboration-detail.component";
import { CollaborationStatisticsComponent } from './collaboration-statistics/collaboration-statistics.component';

// primeng
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { SelectButtonModule } from "primeng/selectbutton";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { PaginatorModule } from "primeng/paginator";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";
import { DynamicDialogModule } from 'primeng/dynamicdialog';

// libs
import { ClipboardService, ClipboardModule } from 'ngx-clipboard';
import { MatIconModule } from '@angular/material/icon';

// services
import { CollaborationServices } from "./../services/collaboration.services";
import { SystemService } from "app/services/system.services";
import { MessageService } from "primeng/api";
import { DialogService } from 'primeng/api';
import { CurrencyFormatChina } from './../common/pipe-china-money.component';


export const CollaborationRoutes: Routes = [
  {
    path: "",
    component: CollaborationListComponent,
  },
  {
    path: "collaboration-statistics",
    component: CollaborationStatisticsComponent,
  },
];

@NgModule({
  declarations: [ CollaborationListComponent, CollaborationDetailComponent, CollaborationStatisticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CollaborationRoutes),
    ShareCommonModule,
    // primeng
    InputTextModule,
    ButtonModule,
    TableModule,
    SelectButtonModule,
    DropdownModule,
    CalendarModule,
    PaginatorModule,
    ToastModule,
    TooltipModule,
    DynamicDialogModule,
    ClipboardModule,

    // Mat
    MatIconModule,
    // form
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [CollaborationServices, SystemService, MessageService, DialogService, ClipboardService],
  entryComponents: [CollaborationDetailComponent]
})
export class CollaborationModule {}
