import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingModule } from 'src/app/drawing/drawing.module';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  //providers:[DocumentService]
})
export class DocumentComponent implements OnInit {

  imgSrc: string 


  constructor(private documentService : DocumentService, private router: Router, 
    private drawing: DrawingModule) { }

  ngOnInit(): void {
    //this.imgSrc = "assets/img/rachel_1.jpg"
    this.imgSrc =this.documentService.currDoc.imgUrl
  }

  logout()
  {
    this.router.navigate(['/'])
  }
}



