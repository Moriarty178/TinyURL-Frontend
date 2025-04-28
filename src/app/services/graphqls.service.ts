import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, MutationResult } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_PARAM_LIST, GET_LONG_URL, GET_QR_CODE, GET_ALL_LONG_URLS, GET_ALL_SHORT_URLS, SHORTEN_URL } from 'src/queries';
@Injectable({
  providedIn: 'root'
})
export class GraphqlsService {

  constructor(private apollo: Apollo) { }

  getLongUrl(shortUrl: string): Observable<string> {
    return this.apollo.query({
      query: GET_LONG_URL,
      variables: {
        shortUrl: shortUrl,
      }
    })
    .pipe(
      map((result: ApolloQueryResult<any>) => {
        return result.data + "_piter";
      })
    );
  }
  //tạo tinyUrl
  shortenUrl(longUrl: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SHORTEN_URL,
      variables: {
        longUrl: longUrl
      }
    });
  }

  // lấy QR Code
  getQRCode(tinyUrl: string): Observable<any> {
    return this.apollo.query({
      query: GET_QR_CODE,
      variables: {
        shortUrl: tinyUrl
      }
    });
  }

  convertBase64ToImage(base64String: string): any {
    const byteString = atob(base64String);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], {type: 'image/jpeg'});
    const url = URL.createObjectURL(blob);
    return url;
  }
}
