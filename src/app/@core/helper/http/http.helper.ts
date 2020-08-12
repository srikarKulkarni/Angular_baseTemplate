//#region angular imports

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//#endregion angular imports

//#region core imports

import { CoreConstant } from '@core/core.constant';

//#endregion core imports

//#region functional/model imports
//#endregion functional/model imports

@Injectable()
export class HttpHelper {

  //#region model properties
  //#endregion model properties

  //#region constructor

  constructor(private http: HttpClient) {
  }

  //#endregion constructor

  //#region public functions

  /**
   * get json data from api
   * @param url
   * @param options
   */
  public get(url: string): Observable<any> {
    if (url) {
      return this.http.get(url);
    }
    return new Observable<any>();
  }

  /**
   * posts data to api
   * @param url
   * @param data
   */
  public post(url: string, data: any):Observable<any> {
    if (url) {
      let httpheaders = new HttpHeaders();
      httpheaders.append(CoreConstant.header.contentTypeName, CoreConstant.header.jsonContentType);
      return this.http.post(url, data, { headers: httpheaders });
    }
    return new Observable<any>();
  }

  /**
   * put api call
   * @param url
   * @param body
   */
  public put(url: string, body: any): Observable<any> {
    if (url) {
      return this.http.put(url, body);
    }
    return new Observable<any>();

  }

  /**
   * delete api call
   * @param url
   */
  public delete(url: string): Observable<any> {
    if (url) {
      return this.http.delete(url);
    }
    return new Observable<any>();

  }

  //#endregion public functions

  //#region private functions
  //#endregion private functions

}
