import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

const announRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: AnnouncementComponent}
];

@NgModule({
  declarations: [AnnouncementComponent],
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule.forRoot(),
    RouterModule.forChild(announRoutes),
    ModalModule.forRoot()
  ]
})
export class AnnouncementModule { }
