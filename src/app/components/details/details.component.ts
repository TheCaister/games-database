import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Game } from "../../models";
import { HttpService } from "../../services/http.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId: string;
  game: Game;
  // Making subscription variables so that they can be unsubscribed later on
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    // Listen for parameters in the route. Get the id from the params and then get the details of that particular game
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params["id"];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string): void {
    // Request a game from http service
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResponse: Game) => {
        // Set game to the game returned from the API
        this.game = gameResponse;
        // Add a bit of a delay to load in the rating
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }

  // Get different colour for the rating gauge depending on the game rating
  getColor(value: number): string {
    if (value > 75) {
      return "#5ee432";
    } else if (value > 50) {
      return "#fffa50";
    } else if (value > 30) {
      return "#f7aa38";
    } else {
      return "#ef4655";
    }
  }

  ngOnDestroy(): void{
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }

    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }
}
