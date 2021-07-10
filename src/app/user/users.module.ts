import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule } from '@angular/forms';

import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserProfileComponent } from './user-profile/user-profile.component'; 
import { UserEditComponent } from './user-edit/user-edit.component';
//import { UserListComponent } from './user-list-1/userlist.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersRoutes } from './users.routing';

//service
import { UserService } from 'app/services/user.service';
import { SystemService } from 'app/services/system.services';
import { RightService } from 'app/services/right.services';

//Primeng service
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';

//Primeng
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(UsersRoutes),
    MatIconModule,
    FlexLayoutModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    InputTextModule,
    DialogModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    MessagesModule,
    ReactiveFormsModule,
    TableModule,
    CheckboxModule,
    OverlayPanelModule
  ],
  declarations: [
    UserProfileComponent,
    UserListComponent,
    ChangePasswordComponent,
    UserEditComponent
  ],
  providers: [
    ConfirmationService,
    MessageService,
    UserService,
    SystemService,
    RightService
  ]
})

export class UsersModule {}
