import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import {buffer, map, switchMap, takeUntil} from 'rxjs/operators';
import { GeometryService } from './geometry.service';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  mouseDown$ :Observable<any> 
  mouseMove$ :Observable<any> 
  mouseUp$ :Observable<any> 
  mouseMoveUntilUp$ :Observable<any> 
  drag$ :Observable<any> 
  poly$ :Observable<any> 
  drop$ :Observable<any> 

  constructor(private geometryService:GeometryService) { 
  }

  init(canvas: ElementRef)
  { 
    var canvasRect = canvas.nativeElement.getBoundingClientRect()
    this.mouseDown$ = fromEvent(canvas.nativeElement, 'mousedown')
    this.mouseMove$ =fromEvent(canvas.nativeElement, 'mousemove')
    this.mouseUp$ =fromEvent(canvas.nativeElement, 'mouseup')
    this.mouseMoveUntilUp$ = this.mouseMove$.pipe(takeUntil(this.mouseUp$))

    this.drag$= this.mouseDown$.pipe(
      switchMap(evt=> 
        this.mouseMoveUntilUp$.pipe(
          map(evt=>this.geometryService.getPath(evt,canvasRect)))
        ))

    this.poly$= this.drag$.pipe( //keeps each {from x to x,from y to y} of the drag path to a buffer
      buffer(this.mouseUp$)
    )

    this.drop$ = this.poly$.pipe( // when drop we get all data of the path
      map(arr=>this.geometryService.getShapeCoord(arr))
    )
  }

  getCenterAndRadius(objCoord)
  {
    return this.geometryService.getCenterAndRadius(objCoord)
  }
  getRectParameters(objCoord)
  {
    return this.geometryService.getRectParameters(objCoord)
  }
}


