import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // //localhost:4200/login
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)},
  //localhost:4200/main
  { path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule),canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
