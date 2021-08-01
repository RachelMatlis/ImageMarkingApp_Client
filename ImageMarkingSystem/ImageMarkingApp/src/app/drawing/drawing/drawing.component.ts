import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, observable, Observable, VirtualTimeScheduler } from 'rxjs';
import { DrawingService } from '../drawing.service';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css'],
  providers:[DrawingService,MarkerService]
})

export class DrawingComponent implements OnInit {

  @ViewChild('freeDrawCanvas') freeDrawCanvas: ElementRef 
  @ViewChild('shapeDrawCanvas')  shapeDrawCanvas: ElementRef 
  @ViewChild('selectedCanvas')  selectedCanvas: ElementRef 
  @ViewChild('btnEllipse')  btnEllipse: ElementRef 
  @ViewChild('btnRect')  btnRect: ElementRef 
  @ViewChild('btnClear')  btnClear: ElementRef 
  @ViewChild('btnNoFill')  btnNoFill: ElementRef 
  @Input('value')

  btnRectClick$:Observable<any> 
  btnEllipseClick$:Observable<any> 
  btnClearClick$ : Observable<any>
  btnNoFillClick$ : Observable<any>

  markersList  : Array<any> = new Array<any>()
  state: string 
  markerBackColorFill : string
  private cValue: string 
  noFill: boolean 
  isNewMarker: boolean
  markerIndex : number
  private cx: CanvasRenderingContext2D 
  
  constructor(private drawingService:DrawingService, private markerService:MarkerService,) {
    this.state="ellipse"
    this.cValue= "#1de4d7"
    this.noFill = false
    this.markerIndex = -1
    this.isNewMarker = true
    this.markerBackColorFill= this.cValue

   }

  ngOnInit():void{
    this.getAllMarkers() 
  }

  ngAfterViewInit(): void {
    this.drawingService.init(this.freeDrawCanvas)
    this.btnRectClick$ = fromEvent(this.btnRect.nativeElement,'click')
    this.btnEllipseClick$ = fromEvent(this.btnEllipse.nativeElement,'click')
    this.btnClearClick$ = fromEvent(this.btnClear.nativeElement,'click')
    this.btnNoFillClick$=fromEvent(this.btnNoFill.nativeElement,'click')

    this.btnRectClick$.subscribe(evt=>this.state='rectangle' )
    this.btnEllipseClick$.subscribe(evt=>this.state='ellipse')
    this.btnClearClick$.subscribe(evt=> this.clearAllMarkers())
    this.btnNoFillClick$.subscribe(evt=>this.noFill=true)

    this.drawingService.drag$.subscribe(obj=>this.drawOnCanvas(obj))
    this.drawingService.drop$.subscribe((obj:any)=> this.drawShape(obj))

    const canvasEl: HTMLCanvasElement = this.freeDrawCanvas.nativeElement;
    var canvasRect = canvasEl.getBoundingClientRect()
    this.initCX(canvasEl)
  }

  set value(value: string) 
  {
    this.noFill=false
    this.cValue = value;
    this.markerBackColorFill=this.cValue
  }

  get value(): string 
  {
    return this.cValue;
  }

  getAllMarkers() 
  {
    this.markerService.getAllMarkers().subscribe(
      (res:any) =>
      {
        this.markersList = this.markerService.sortMarkers(res.marker)
        this.isNewMarker = false
        this.showAllMarkers()
      }
    )
  }

  showAllMarkers()
  {
    for(var i=0; i<this.markersList.length;i++)
    {
      this.showMarker(this.markersList[i])
    }
  }

  showMarker(marker)
  {
    var location = this.markerService.getMarkerLocation(marker)
    var ctx = this.shapeDrawCanvas.nativeElement.getContext("2d")
    ctx.fillStyle = marker.markerBackColor == "Transparent" ? "transparent" : marker.markerBackColor
    ctx.globalAlpha = 0.2;
    if(marker.markerType == "ellipse"){
      this.drawEllipse(location,ctx)
    }
    else{
      this.drawRect(location,ctx)
    }
  }

  initCX(canvasEl: HTMLCanvasElement)
  {
    this.cx = canvasEl.getContext('2d');
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
  }

  drawOnCanvas(obj:any) {
    this.isNewMarker = true
    if (!this.cx) { return; }

    this.cx.beginPath();

    if (obj.fromX && obj.fromY) {
      this.cx.moveTo(obj.fromX, obj.fromY)
      this.cx.lineTo(obj.toX,obj.toY)
      this.cx.stroke()
    }
  }

  drawShape(obj:any)
  {
    var ctx = this.shapeDrawCanvas.nativeElement.getContext("2d")
    ctx.fillStyle = this.noFill ? "transparent" : this.markerBackColorFill        
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.2;
    this.state=='rectangle'?this.drawRect(obj,ctx): this.drawEllipse(obj,ctx)
  }

  drawEllipse(objCoord:any, ctx)
  {
    this.ClearCanvas(this.freeDrawCanvas.nativeElement.getContext('2d'))
    var obj= this.drawingService.getCenterAndRadius(objCoord)
    ctx.beginPath()
    ctx.ellipse(obj.cX, obj.cY, obj.rX, obj.rY, 0, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

    if(this.isNewMarker)
    {
      this.createMarker(objCoord)
    }
  }

  drawRect(objCoord:any, ctx)
  {
    this.ClearCanvas(this.freeDrawCanvas.nativeElement.getContext('2d'))
    var obj=this.drawingService.getRectParameters(objCoord)
    ctx.beginPath()
    ctx.rect(obj.x,obj.y,obj.width,obj.height)
    ctx.fill()
    ctx.stroke()

    if(this.isNewMarker)
    {
      this.createMarker(objCoord)
    }

  }

  ClearCanvas(ctx)
  {
    ctx.clearRect(0, 0, this.freeDrawCanvas.nativeElement.width, this.freeDrawCanvas.nativeElement.height)
  }

  createMarker(obj:any)
  {
    var markerBackColor= this.noFill? "Transparent":this.markerBackColorFill
    var marker = {markerType:this.state, markerLocation :obj, markerBackColor, markerID: "0"}
    this.markerService.createMarker(marker).subscribe(
      (res:any)=>
      {
        var newMarker = this.markerService.createNewMarker(marker, res.markerID)
        this.markersList.push(newMarker)
        this.markersList = this.markerService.sortMarkers(this.markersList)
      }, 
      error=>console.log(error)
    )
  }

  selectMarker(index)
  {
    this.markerIndex = index
    var canvas= this.selectedCanvas.nativeElement.getContext('2d')
    this.ClearCanvas(canvas)
    var location = this.markerService.getMarkerLocation(this.markersList[index])
    var ctx = canvas
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = "transparent"
    this.isNewMarker=false

    if(this.markersList[index].markerType == "ellipse")
    {
      this.drawEllipse(location,ctx)
    }
    else
    {
      this.drawRect(location,ctx)
    }
  }

  deleteMarker()
  {
    var MarkerID= this.markersList[this.markerIndex].markerID
    this.markerService.removeMarker({MarkerID}).subscribe(
      (res:any)=>
      {
        this.ClearCanvas(this.shapeDrawCanvas.nativeElement.getContext('2d'))
        this.ClearCanvas(this.selectedCanvas.nativeElement.getContext('2d'))
        this.markersList.splice(this.markerIndex, 1)
        this.showAllMarkers()
      }, 
      error=>console.log(error)
    )
  }

  clearAllMarkers()
  {
    this.ClearCanvas(this.shapeDrawCanvas.nativeElement.getContext('2d'))
    this.ClearCanvas(this.selectedCanvas.nativeElement.getContext('2d'))

    for(var i=0; i< this.markersList.length;i++)
    {
      var MarkerID = this.markersList[i].markerID
      this.markerIndex= i
      this.markerService.removeMarker({MarkerID}).subscribe(
        (res:any)=>
        {
        }, 
        error=>console.log(error)
      )
    }

    this.markersList.splice(0, this.markersList.length)
  }

  updateMarker()
  {
    this.markersList[this.markerIndex].markerBackColor = this.markerBackColorFill
    this.markerService.updateMarker(this.markersList[this.markerIndex]).subscribe(
      (res:any)=>
      {
        this.ClearCanvas(this.shapeDrawCanvas.nativeElement.getContext('2d'))
        this.isNewMarker = false
        this.showAllMarkers()
      }
    )
  }
}