import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return `assets/icons/avatar.svg`;
    return `https://icherniakov.ru/yt-course/${value}`;
  }
}
