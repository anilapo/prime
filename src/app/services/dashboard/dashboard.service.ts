import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl: string = 'https://ipotrading.herokuapp.com/';

  constructor(private http: HttpClient) {}

  getStockAndFpDetails(username: String): Observable<any> {
    return this.http.get(this.baseUrl + 'bns/findByUName/' + username);
  }

  getIpoDetails(username: String): Observable<any> {
    return this.http.get(this.baseUrl + 'findIpo/' + username);
  }
}
