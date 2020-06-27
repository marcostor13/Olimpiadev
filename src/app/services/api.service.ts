import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = ''; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) {
    if (window.location.href.indexOf('35.238.14.128') > -1 || window.location.href.indexOf('olimpiadev' ) > -1) {
      this.url = 'http://olimpiadev.tk/api/';
    } else {
      this.url = 'http://localhost:8000/api/';
    }
  }

  api(data:any) {
    const headers = new HttpHeaders({     
      'Authorization': 'Bearer '+data.token
    })
    if(data.type == 'post'){
      return this.http.post(`${this.url + data.service}`, data, { headers: headers });
    }else if(data.type == 'get'){
      return this.http.get(`${this.url + data.service}`, { headers: headers })
    }
  }

  c(title:String, message:String) {
    console.log('%c' + title + '%c=>', "background-color: purple; color:white;font-family:system-ui;font-size:10pt;font-weight:bold;padding: 4px", "background-color: white; color:purple;font-size:10pt;font-weight:bold;padding: 4px", message);
  }


}
