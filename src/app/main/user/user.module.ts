import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/core/services/data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UploadService } from 'src/app/core/services/upload.service';

const userRoutes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/user/index
  { path: 'index', component: UserComponent }
]



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    MultiselectDropdownModule,
    Daterangepicker,
    ModalModule.forRoot(),
    RouterModule.forChild(userRoutes)
  ],
  providers: [DataService, NotificationService,UploadService]
})
export class UserModule { }
