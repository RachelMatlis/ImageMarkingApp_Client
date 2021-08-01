import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:"", component:MainComponent},
  {path:"user",loadChildren:()=>import('../app/user/user.module').then(m=>m.UserModule)},
  //{path:"document",loadChildren:()=>import('../app/document-manager/document-manager.module').then(m=>m.DocumentManagerModule)},
  {path:"document-manager",loadChildren:()=>import('../app/document-manager/document-manager.module').then(m=>m.DocumentManagerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
