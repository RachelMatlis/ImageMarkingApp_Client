import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeometryService {

  constructor() {

   }

  getPath(evt: MouseEvent, clientRect: any): any {
    var[x,y] = this.getLocalCoord(evt, clientRect )
    return {fromX: x- evt.movementX, fromY: y-evt.movementY, toX: x, toY:y}
  }
  
  getShapeCoord(arr: any): any {

    var res={fX:Number, fY:Number, tX:Number, tY:Number}
    res.fX=arr[0].fromX
    res.fY=arr[0].fromY
    res.tX=arr[0].toX
    res.tY=arr[0].toY
    for (let i = 0; i < arr.length; i++)
    {
      if(arr[i].fromX < res.fX)
      res.fX=arr[i].fromX
      if(arr[i].fromY < res.fY)
      res.fY=arr[i].fromY
      if(arr[i].toX > res.tX)
      res.tX=arr[i].toX
      if(arr[i].toY > res.tY)
      res.tY=arr[i].toY

    }
    
    return res
  }

  getCenterAndRadius(obj:any)
  {
    var lenghtX=obj.tX - obj.fX
    var radiusX=lenghtX/2
    var centerX= obj.fX +radiusX

    var lenghtY=obj.tY - obj.fY
    var radiusY=lenghtY/2
    var centerY= obj.fY +radiusY
    
    return {cX: centerX,cY: centerY,rX:radiusX,rY:radiusY} 
  }

  getLocalCoord(evt: MouseEvent, clientRect: any) : any{
    return [evt.clientX-clientRect.left, evt.clientY-clientRect.top]
  }

  getRectParameters(obj:any)
  {
    var width=obj.tX-obj.fX
    var height= obj.fY-obj.tY
    return{x:obj.fX, y:obj.tY,width:width, height:height}
  }
}