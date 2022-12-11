import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {CheckboxModule} from "primeng/checkbox";
import { HomeComponent } from './pages/home/home.component';
import {StyleClassModule} from "primeng/styleclass";
import { AddComponent } from './pages/home/add/add.component';
import {DialogService} from "primeng/dynamicdialog";
import { DetailComponent } from './pages/home/detail/detail.component';
import {PaginatorModule} from "primeng/paginator";
import {CalendarModule} from "primeng/calendar";
import {EditComponent} from "./pages/home/edit/edit.component";
import { EditreviewComponent } from './editreview/editreview.component';
import { FriendsComponent } from './friends/friends.component';
import {DataViewModule} from 'primeng/dataview';
import {TreeTableModule} from 'primeng/treetable';
import { ShowfriendsComponent } from './showfriends/showfriends.component';
import {CaptchaModule} from 'primeng/captcha';
import {PasswordModule} from 'primeng/password';
import {ListboxModule} from 'primeng/listbox';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddComponent,
    DetailComponent,
    EditComponent,
    EditreviewComponent,
    FriendsComponent,
    ShowfriendsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    InputSwitchModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    FileUploadModule,
    InputTextareaModule,
    RippleModule,
    InputNumberModule,
    ToastModule,
    AvatarModule,
    CardModule,
    TableModule,
    ConfirmDialogModule,
    CheckboxModule,
    StyleClassModule,
    PaginatorModule,
    CalendarModule,
    DataViewModule,
    TreeTableModule,
    CaptchaModule,
    PasswordModule,
    ListboxModule,
    AvatarGroupModule,
    ChipModule
  ],
  providers: [MessageService, ConfirmationService, DialogService],
  bootstrap: [AppComponent]
})

export class AppModule { }
