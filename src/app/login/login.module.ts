import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';

export const loginRoutes: Routes = [
  //localhost:4200/login
  { path: '', component: LoginComponent }
];



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(loginRoutes)
  ],
  providers: [AuthenService, NotificationService]
})
export class LoginModule { }
