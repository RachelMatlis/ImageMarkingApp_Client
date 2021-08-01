import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentService } from '../document-manager/document.service';
import { UserProfileService } from '../user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  httpOptions = {
    headers:new HttpHeaders(
      {'Content-Type':'application/json'}
    )
  }

  constructor(private httpClient:HttpClient, private profileServive:UserProfileService,  
    private documentService : DocumentService) { 

  }

  getAllMarkers() :Observable<any>
  {
    var DocumentId = this.documentService.currDoc.documentId
    return this.httpClient.post<any>("api/Marker/GetAllMarkers",{DocumentId},this.httpOptions)
  }

  createMarker(marker)
  {
    var DocID = this.documentService.currDoc.documentId
    var MarkerType= marker.markerType
    var MarkerLocation = this.crateMarkerLocationStr(marker.markerLocation) 
    var MarkerBackColor = marker.markerBackColor
    var UserID = this.profileServive.userID
    var markerData = {DocID, MarkerType, MarkerLocation, MarkerBackColor, UserID}
    return this.httpClient.post<any>("api/Marker/Create",markerData,this.httpOptions)
  }

  removeMarker(markerData)
  {
    return this.httpClient.post("api/Marker/Remove",markerData,this.httpOptions)
  }

  updateMarker(marker)
  {
    var DocID = marker.docID
    var MarkerType= marker.markerType
    var MarkerLocation = marker.markerLocation
    var MarkerBackColor = marker.markerBackColor
    var UserID = marker.userID
    var MarkerID = marker.markerID
    var markerData = {DocID, MarkerType, MarkerLocation, MarkerBackColor, UserID, MarkerID}
    console.log(markerData)
    return this.httpClient.post("api/Marker/Update",markerData,this.httpOptions)
  }

  crateMarkerLocationStr(obj) :string
  {
    var fromX = obj.fX.toString()
    var fromY = obj.fY.toString()
    var toX = obj.tX.toString()
    var toY = obj.tY.toString()

    return (fromX + "," + fromY + "," + toX + "," + toY)
  }

  getMarkerLocation(marker)
  {
    var markerLocationStr = marker.markerLocation.split(",")
    var fromX = parseFloat(markerLocationStr[0])
    var fromY = parseFloat(markerLocationStr[1])
    var toX = parseFloat(markerLocationStr[2])
    var toY = parseFloat(markerLocationStr[3])
    return {fX: fromX,fY: fromY , tX: toX, tY:toY} 
  }

  sortMarkers(markers)
  {
    return markers.sort((markerA, markerB) =>(parseFloat(markerA.markerLocation.split(",")[1]) 
    - parseFloat(markerB.markerLocation.split(",")[1])))
  }

  createNewMarker(marker, markerID) 
  {
    var docID = this.documentService.currDoc.documentId
    var markerType= marker.markerType
    var markerLocation =this.crateMarkerLocationStr(marker.markerLocation)
    var markerBackColor = marker.markerBackColor
    var userID = this.profileServive.userID
    var markerID = markerID
    var newM = {docID, markerType, markerLocation, markerBackColor, userID, markerID}
    return {docID, markerType, markerLocation, markerBackColor, userID, markerID}
  }

}
