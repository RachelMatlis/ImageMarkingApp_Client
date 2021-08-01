import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadDocModule } from '../upload-doc/upload-doc.module';
import { DocumentComponent } from './document/document.component';
import { DocumentsComponent } from './documents/documents.component';

const routes: Routes = [
  {path:'document',component:DocumentComponent},
  {path:'documents',component:DocumentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentManagerRoutingModule { }
