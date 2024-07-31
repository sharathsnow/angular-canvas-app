import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CanvasComponent } from './canvas/canvas.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ImageUploadComponent,CanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'canvas-app';
  showTemplate = false;
  images: HTMLImageElement[] = [];

  toggleTemplate() {
    this.showTemplate = !this.showTemplate;
  }

  onImageLoaded(image: HTMLImageElement) {
    this.images.push(image);
  }
}
