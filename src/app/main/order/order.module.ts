import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/core/services/data.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { UploadService } from 'src/app/core/services/upload.service';

const orderRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: OrderComponent },
  { path: 'add', component: OrderAddComponent },
  { path: 'detail/:id', component: OrderDetailComponent }
];

@NgModule({
  declarations: [OrderComponent, OrderAddComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes),
    FormsModule,
    PaginationModule,
    Daterangepicker,
    ModalModule.forRoot()
  ],
  providers: [DataService, UtilityService, UploadService]
})
export class OrderModule { }
