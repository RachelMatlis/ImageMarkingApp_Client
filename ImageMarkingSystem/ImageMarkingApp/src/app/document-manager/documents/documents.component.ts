import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { SharingService } from '../sharing.service';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  //providers:[DocumentService]
})
export class DocumentsComponent implements OnInit {

  documentFormData:FormGroup
  shareFormData : FormGroup
  fileName:string
  documentsList : Array<any> = new Array<any>()
  sharedDocumentsList : Array<any> = new Array<any>()
  selectDoc= document.getElementById("documents")
  createFileRes = false
  userID : string
  

  selectedFile: any
  selectedSharedFile : any
  
 
  private cx: CanvasRenderingContext2D;

  constructor(private documentService : DocumentService,private sharingService:SharingService, private router:Router){
    
  }

  ngOnInit(){
    this.documentFormData = new FormGroup({
      file:new FormControl(null),
      name: new FormControl('',Validators.required) 
    })

    this.shareFormData = new FormGroup({
      sharedUserID: new FormControl('',[Validators.required,Validators.email]) 
    })

    this.userID= this.documentService.userId

    this.showDocuments()
  }

  onFileChange(event){
    this.fileName=event.target.files[0].name
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

  createFile(){
    var documentName = this.documentFormData.controls['name'].value
    var File = this.documentFormData.controls['file'].value
    var filedata = {documentName, File}
    this.documentService.createFile(filedata).subscribe(
      (res:any)=>
      {
        if(res.success)
        {
          this.createFileRes = true
          this.showDocuments()
        }
      }, 
      error=>console.log(error)
    )
  }

  showDocuments() 
  {
    this.documentService.getAllDocuments().subscribe(
      (res:any) =>
      {
        this.documentsList = res.docList
      }
    )

    this.sharingService.getAllSharedDocuments().subscribe(
      (res:any) =>
      {
        this.sharedDocumentsList = res.sharedDocsList
      }
    )
  }

  removeDocument()
  {
    if(this.documentsList.length >0)
    {
      this.documentService.removeDocument(this.selectedFile.documentId).subscribe(
        (res:any) =>
        {
          this.showDocuments()
        }
      )
    }
  }
 
  ngOnAfterViewInit(){

  }

  editDoc()
  {
    this.documentService.getDoc(this.selectedFile.documentId).subscribe(
      (res:any) =>
      {
        if(res.success)
        {
          this.documentService.currDoc = res.document
          this.router.navigate(['document-manager/document'])
        }
      }
    )
  }
  
  createShare()
  {
    var docID = this.selectedFile.documentId
    var userToShare= this.shareFormData.controls['sharedUserID'].value
    console.log(userToShare)
    var share= {docID, userToShare}
    this.sharingService.createShare(share).subscribe(
      (res:any) =>
      {
        console.log(res)
      }
    )
  }

  removeShare()
  {
    var docID = this.selectedFile.documentId
    this.sharingService.removeShare(docID).subscribe(
      (res:any) =>
      {
        console.log(res)
      }
    )
  }
}
