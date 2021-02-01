import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { DataService } from 'src/app/core/services/data.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { SimpleTinyComponent } from 'src/app/shared/simple-tiny/simple-tiny.component';

const productRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ProductComponent }
];


@NgModule({
  declarations: [ProductComponent,SimpleTinyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
    Daterangepicker,
    MultiselectDropdownModule
  ],
  providers: [DataService, UtilityService, UploadService]
})
export class ProductModule { }
