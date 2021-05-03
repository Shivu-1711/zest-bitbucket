import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor(private http: HttpClient) { }
  getRequestMethod(requesturl) {
    return this.http.get(environment.baseUrl + requesturl);
  }

  putRequestMethod(requesturl, requestdata) {
    return this.http.put(environment.baseUrl + requesturl, requestdata);
    }

  postRequestMethod(requesturl, requestdata) {
      return this.http.post(environment.baseUrl + requesturl, requestdata);
    }

  deleteRequestMethod(requesturl, requestdata) {
      return this.http.delete(environment.baseUrl + requesturl + requestdata);
  }
}

