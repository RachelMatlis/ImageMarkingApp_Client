import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileService } from '../user-profile.service';


@Injectable()
export class DocumentService {

   currDoc
   userId : string

  httpOptions = {
    headers:new HttpHeaders(
      {'Content-Type':'application/json'}
    )
  }

  constructor(private httpClient:HttpClient, private profileServive:UserProfileService){ 
    this.userId = this.profileServive.userID
  }

  getAllDocuments() :Observable<any>
  {
    var UserId = this.userId
    return this.httpClient.post<any>("api/Document/GetDocuments",{UserId},this.httpOptions)
  }

  createFile(file)
  {
    var fileData = {DocumentName:file.documentName,File:file.File, UserId:this.userId}
    return this.httpClient.post("api/Document/Create",fileData,this.httpOptions)
  }

  removeDocument(docID)
  {
    var docData = {UserId:this.userId,DocumentId:docID}
    return this.httpClient.post("api/Document/Remove",docData,this.httpOptions)
  }

  getDoc(docID)
  {
    var docData = {UserId:this.userId,DocumentId:docID}
    return this.httpClient.post<any>("api/Document/GetDocument",docData,this.httpOptions)
  }
}
