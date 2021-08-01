import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingComponent } from './drawing/drawing.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DrawingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DrawingComponent
  ]
})
export class DrawingModule { }
