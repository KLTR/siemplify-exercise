import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  pageSizeUrl = 'assets/pageSize.json'
  constructor(private http: HttpClient) { }

  getPageSize(): Observable<any> {
    return this.http.get(this.pageSizeUrl);
  }
}
