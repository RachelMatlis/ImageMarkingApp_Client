import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit{
  
  documentFormData:FormGroup
  title = 'FileUpload';
  @ViewChild('canvas') canvas: ElementRef 
  private cx: CanvasRenderingContext2D;

  constructor(private http:HttpClient, private uploadService:UploadService){

  }

  ngOnInit(){
    this.documentFormData = new FormGroup({
      file:new FormControl(null),
      name: new FormControl('',Validators.required) 
    })
  }

  onFileChange(event){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.documentFormData.patchValue({
          file: reader.result
       });
      }
    }
    
  }

  onSubmit(){

    var docName = this.documentFormData.controls['name'].value
    var File = this.documentFormData.controls['file'].value
    
    //this. uploadFileToCanvas()
    if(this.uploadService.uploadFileToService(File,docName))
    {
      this. uploadFileToCanvas()
    }
  }

  uploadFileToCanvas()
  {
    
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d')!;
    let image = new Image();


    canvasEl.width = 600;
    canvasEl.height = 600;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    image.onload = ()=> {
        this.cx.drawImage(image, 0, 0, 600, 600);
    }
    image.src = "./src/assets/img/ocean.jpg"
    

  }

  ngOnAfterViewInit(){

    
  }
}
