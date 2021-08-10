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
  public pageSize = 20;
  public games: Array<Game>;
  public hasSorted: boolean = false;
  private routeSubscription: Subscription;
  private gameSubscription: Subscription;

  constructor(private httpService: HttpService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  public currentPage = this.httpService.pageNumber

  ngOnInit(): void {
    console.log("Current sort: " + this.sort);

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
      .getGamesList(sort, search, this.pageSize)
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

  // Updating the value of currentPage
  updatePage(){
    this.currentPage = this.httpService.pageNumber;
  }

  // Updating the size of the page
  updatePageSize(){
    console.log(this.pageSize);

    this.searchGames(this.sort);
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

  // For displaying the selected sort in the sort selection box
  sortSelectionFormat(selectedSort: string){
    let formattedString;
    // Removing the -
    if(selectedSort[0] === '-'){
      formattedString = selectedSort.slice(1);
    }

    return this.capitalizeFirstLetter(formattedString);

  }

  // Helper function for capitalizing the first letter of a string
  capitalizeFirstLetter(string: string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  detectSelectionChange(sort: string){
    this.hasSorted = true;
    console.log(this.hasSorted);
    this.searchGames(sort);
  }
}
