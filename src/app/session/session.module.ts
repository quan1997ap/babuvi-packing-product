import { NgModule } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  MatCardModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LockScreenComponent } from "./lockscreen/lockscreen.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SessionRoutes } from "./session.routing";
import { XHRBackend, RequestOptions, HttpModule } from "@angular/http";
import { HttpService } from "app/services/common/http.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import {
  MessagesModule,
  CheckboxModule,
  CaptchaModule,
  DropdownModule,
} from "primeng/primeng";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TooltipModule } from "primeng/tooltip";
import { MatTooltipModule } from "@angular/material/tooltip";

import { DynamicDialogModule } from "primeng/dynamicdialog";

//service
import { LoginService } from "app/services/login.service";
import { UserService } from "app/services/user.service";
import { SystemService } from "app/services/system.services";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forChild(SessionRoutes),
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
    HttpModule,
    MatProgressSpinnerModule,
    ToastModule,
    MessagesModule,
    CheckboxModule,
    CaptchaModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    MatTooltipModule,
    DynamicDialogModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LockScreenComponent,
  ],
  providers: [
    HttpService,
    LoginService,
    MessageService,
    UserService,
    SystemService,
  ],
  entryComponents: []
})
export class SessionModule {}
