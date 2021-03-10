import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({providedIn:"root"})
export class ImagesService {
  constructor(private http: HttpClient) {}

  uploadImg(image: File) {
    const img = new FormData();
    const date = new Date().getTime();
    const imgName = Math.round(date / 1000 - 160000000).toString();
    img.append('image', image, imgName);
    return this.http.post<{ url: string }>(
      `${environment.api}/images`,
      img
    );
  }


  deletePhoto(img: string) {
    // TODO
  }

  

}
