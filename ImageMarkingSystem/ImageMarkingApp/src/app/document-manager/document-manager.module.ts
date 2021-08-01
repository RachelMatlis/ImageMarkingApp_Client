import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentManagerRoutingModule } from './document-manager-routing.module';
import { DocumentComponent } from './document/document.component';
import { UploadDocModule } from '../upload-doc/upload-doc.module';
import { DrawingModule } from '../drawing/drawing.module';
import { DocumentsComponent } from './documents/documents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DocumentService } from './document.service';
import { SharingService } from './sharing.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    DocumentComponent,
    DocumentsComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    DocumentManagerRoutingModule,
    UploadDocModule,
    DrawingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DocumentService,
    SharingService
  ]
})
export class DocumentManagerModule { }
