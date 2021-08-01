import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable(

)
export class UploadService {
  constructor(private http: HttpClient) {
    
   }

  uploadFileToService(File: string, FileName:string) : boolean
  {
    var fileData = {File, FileName}

    console.log(fileData)
    var httpOptions = {
      headers:new HttpHeaders(
        {'Content-Type':'application/json'}
      )
    }
  
    var post = this.http.post("api/Document/UploadFile",fileData,httpOptions)
    post.subscribe(
      response=>console.log("Gotit"),
      error=>console.log(error)
      )
      
      return true
  }



}

  
