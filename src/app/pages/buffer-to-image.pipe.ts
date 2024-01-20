// buffer-to-image.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bufferToImage'
})
export class BufferToImagePipe implements PipeTransform {
  transform(buffer: any): string {
    if (buffer && buffer.data && buffer.data.length > 0) {
      const byteArray = new Uint8Array(buffer.data);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } else {
      return '';
    }
  }
}