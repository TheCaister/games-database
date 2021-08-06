import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public pageNumber = 1;

  // Using http client to interact with backend
  constructor(private http: HttpClient) { }

  // This function will be called from the home component which will pass in ordering and an optional search. Will return an observable with API response array of games
  getGamesList(ordering: string, search?: string):
  Observable<APIResponse<Game>>{

    let params = new HttpParams().set('ordering', ordering).set('page', this.pageNumber)

    // If there is a search value, update params
    if(search){
      params = new HttpParams().set('ordering', ordering).set('search', search)
    }

   // Using back tick `` for processing stuff into strings
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string) : Observable<Game> {
    // Creating observables from get() method, getting the game's info, trailers and screenshots
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    // Using forkJoin so that when all the observables are complete, emit the last emitted value from each of them.
    return forkJoin({
      gameInfoRequest,
      gameTrailersRequest,
      gameScreenshotsRequest,
    }).pipe(
      // For each value emitted(map)
      map((response: any) => {
        return{
          // Get everything within response['gameInfoRequest'] as well as the screenshots and trailers if they are present
          ...response['gameInfoRequest'],
          screenshots: response['gameScreenshotsRequest']?.results,
          trailers: response['gameTrailersRequest']?.results,
        }
      })
    )
  }
}
