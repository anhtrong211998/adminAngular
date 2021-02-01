import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { RouterModule, Routes } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { UtilityService } from 'src/app/core/services/utility.service';

const cateRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ProductCategoryComponent }
];


@NgModule({
  declarations: [ProductCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(cateRoutes),
    TreeModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [DataService, UtilityService]
})
export class ProductCategoryModule { }
