import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { RouterModule, Routes } from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

const functionRoutes: Routes = [
  //localhost:4200/main/user
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/user/index
  { path: 'index', component: FunctionComponent }
]

@NgModule({
  declarations: [FunctionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(functionRoutes),
    TreeModule.forRoot(),
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class FunctionModule { }
