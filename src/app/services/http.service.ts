import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // Using http client to interact with backend
  constructor(private http: HttpClient) { }

  // This function will be called from the home component which will pass in ordering and an optional search
  getGamesList(ordering: string, search?: string):
  Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering', ordering);

    // If there is a search value, update params
    if(search){
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

   // Using back tick `` for processing stuff into strings
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }
}
