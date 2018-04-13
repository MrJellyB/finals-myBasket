import { Injectable } from "@angular/core";
import { sha256 } from "sha256";

@Injectable()
export class DataService {
  imgUpload(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      const fileReader = new FileReader();

      // this._busyIndicatorService.startUpload();
      fileReader.onload = (event) => {
        formData.append("sha256", sha256(event.target["result"]));
        formData.append("file", file, file.name);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject(xhr.response);
            }
            // this._busyIndicatorService.finishUpload();
          }
        };
        xhr.open("POST", "/file");
        // xhr.setRequestHeader(configMap.authHeader, this._defaultHeaders[configMap.authHeader]);
        xhr.send(formData);
      }
      fileReader.readAsDataURL(file);
    });
  }
}
