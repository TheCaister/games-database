import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from '../../models';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {
  public sort: string = "metacritic";
  public games: Array<Game>;
  private routeSubscription: Subscription;
  private gameSubscription: Subscription;

  constructor(private httpService: HttpService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      // Check if there is a search query for a particular game
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }
      else{
        this.searchGames('metacrit');
      }
    })
  }

  // Searching games, waiting to get an observable of an APIResponse. Once received, set the results to games
  searchGames(sort: string, search?: string) : void{
    this.sort = sort;
    this.gameSubscription = this.httpService
      .getGamesList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList.results);
      });
  }

  // Function for inverting sort
  invertSort(){
    if(this.sort[0] === '-'){
      this.sort = this.sort.substring(1);
    }
    else{
      this.sort = '-' + this.sort;
    }

    this.searchGames(this.sort)
  }

  // Function called to display a game's details when an ID is provided
  openGameDetails(id: string) : void {
    // Navigating to a details page
      this.router.navigate(['details', id]);
  }

  // Unsubcribing once we are done to prevent memory leaks
  ngOnDestroy(): void {
    if(this.gameSubscription){
      this.gameSubscription.unsubscribe();
    }

    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
    }
  }
}
