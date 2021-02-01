import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SlidebarComponent } from '../shared/slidebar/slidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { SignalrService } from '../core/services/signalr.service';
import { UserModule } from './user/user.module';

export const mainRoutes: Routes = [
  {
      //localhost:4200/main
       path: '', component: MainComponent,
      children: [
          //localhost:4200/main
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          //localhost:4200/main/home
          { path: 'home', loadChildren:()=>import("./home/home.module").then(m=>m.HomeModule)},
          //localhost:4200/main/role
          { path: 'role', loadChildren:()=>import("./role/role.module").then(m=>m.RoleModule)},
          //
          { path: 'user', loadChildren:()=>import("./user/user.module").then(m=>m.UserModule)},
          //
          { path: 'function', loadChildren:()=>import("./function/function.module").then(m=>m.FunctionModule)},
          //
          { path: 'product-category', loadChildren:()=>import("./product-category/product-category.module").then(m=>m.ProductCategoryModule)},
          //
          { path: 'product', loadChildren:()=>import("./product/product.module").then(m=>m.ProductModule)},
          //order
          { path: 'order', loadChildren:()=>import("./order/order.module").then(m=>m.OrderModule)},
          //announcement
          { path: 'announcement', loadChildren:()=>import("./announcement/announcement.module").then(m=>m.AnnouncementModule)},
          //report
          { path: 'report', loadChildren:()=>import("./report/report.module").then(m=>m.ReportModule)}
      ]
  }
]

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SlidebarComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    HomeModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers: [UtilityService, AuthenService, SignalrService]
})
export class MainModule { }
