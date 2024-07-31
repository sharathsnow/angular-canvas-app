import { Component, ElementRef, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DraggableImage } from '../draggable-image'
interface DraggableImage extends HTMLImageElement {
  x: number;
  y: number;
  width: number;
  height: number;
}
@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() images: DraggableImage[] = [];
  @ViewChild('image')
  image!: ElementRef<HTMLImageElement>;

  // ngAfterViewInit() {
  //   const img = this.image.nativeElement;
  //   img.style.position = 'absolute';
  //   img.style.left = '100px';
  //   img.style.top = '50px';
  // }
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D | null;
  private draggingImage: DraggableImage | null = null;
  private offsetX: number = 0;
  private offsetY: number = 0;

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
  }

  ngAfterViewInit(): void {
    this.drawImages();
  }

  ngOnChanges(): void {
    this.drawImages();
  }

  drawImages(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (const image of this.images) {
        this.ctx.drawImage(image, image.x || 0, image.y || 0, image.width || 100, image.height || 100);
      }
    }
  }

  onMouseDown(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (const image of this.images) {
      const imgX = image.x || 0;
      const imgY = image.y || 0;
      const imgWidth = image.width || 100;
      const imgHeight = image.height || 100;
      if (x > imgX && x < imgX + imgWidth && y > imgY && y < imgY + imgHeight) {
        this.draggingImage = image;
        this.offsetX = x - imgX;
        this.offsetY = y - imgY;
        break;
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.draggingImage) {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.draggingImage.x = x - this.offsetX;
      this.draggingImage.y = y - this.offsetY;
      this.drawImages();
    }
  }

  onMouseUp(): void {
    this.draggingImage = null;
  }
}
