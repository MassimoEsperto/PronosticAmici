import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MyAlert } from '../componenti/my-alert/my-alert.component';
import { MyButton } from '../componenti/my-button/my-button.component';
import { MyConfirmDialog } from '../componenti/my-confirm-dialog/my-confirm-dialog.component';
import { MyFooter } from '../componenti/my-footer/my-footer.component';
import { MyNavbar } from '../componenti/my-navbar/my-navbar.component';
import { MyPagination } from '../componenti/my-pagination/my-pagination.component';
import { MySpinner } from '../componenti/my-spinner/my-spinner.component';
import { MyTabScrollable } from '../componenti/my-tab-scrollable/my-tab-scrollable.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [
    MyButton,
    MyNavbar,
    MyTabScrollable,
    MyConfirmDialog,
    MyAlert,
    MyFooter,
    MyPagination,
    MySpinner
  ],
  exports: [
    MyButton,
    MyNavbar,
    MyTabScrollable,
    MyConfirmDialog,
    MyAlert,
    MyFooter,
    MyPagination,
    MySpinner
  ],
  providers: [
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
