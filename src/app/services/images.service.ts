import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private httpClient: HttpClient) { }

  // download Image
  download(img) {
    const imgUrl = img;
    const imgName = imgUrl.substr(imgUrl.lastIndexOf("/") + 1);
    this.httpClient
      .get(imgUrl, { responseType: "blob" as "json" })
      .subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });

        // IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(file);
          return;
        }

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = blob;
        link.download = imgName;

        // Version link.click() to work at firefox
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );

        setTimeout(() => {
          // firefox
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  }

}
