import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileService } from '../user-profile.service';

@Injectable()
export class SharingService {
  currDoc
  userId : string
  httpOptions = {
    headers:new HttpHeaders(
      {'Content-Type':'application/json'}
    )
  }

  constructor(private httpClient:HttpClient, private profileServive:UserProfileService) {
    this.userId = this.profileServive.userID
   }

   getAllSharedDocuments() :Observable<any>
   {
      return this.httpClient.post<any>("api/Sharing/GetSharedDocs",{SharedUserID:this.userId},this.httpOptions)
   }

   createShare(share)
   {
     var shareData = {UserID : this.userId ,SharedUserID: share.userToShare,DocumentID:share.docID}
     return this.httpClient.post("api/Sharing/Create",shareData,this.httpOptions)
   }

   removeShare(docID)
   {
    var shareData ={UserID : this.userId, DocumentID:docID}
    return this.httpClient.post("api/Sharing/RemoveShare",shareData,this.httpOptions)
   }
}
