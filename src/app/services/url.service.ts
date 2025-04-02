import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'http://localhost:8080/api/v1/tiny-url';

  constructor(private http : HttpClient) { }

  createShortUrl(longUrl: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/shorten`, { long_url: longUrl });
  }

  getShortUrl(shortUrl: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${shortUrl}`);
  }

  getQRCode(shortUrl: string): Observable<Blob> {
    // return this.http.get(`${this.apiUrl}/qrcode`, {
    //   params: { shortUrl },
    //   responseType: 'blob'
    // });

    return this.http.get(`${this.apiUrl}/qrcode?shortUrl=${shortUrl}`, {responseType: 'blob'});
  }
}
