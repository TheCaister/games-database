import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-games-pages',
  templateUrl: './games-pages.component.html',
  styleUrls: ['./games-pages.component.scss']
})
export class GamesPagesComponent implements OnInit {


  constructor(private httpService: HttpService, private home: HomeComponent) { }

  public currentPage = this.httpService.pageNumber;

  ngOnInit(): void {
  }

  nextPage(){
    this.httpService.pageNumber += 1;
    this.currentPage = this.httpService.pageNumber;
    this.home.searchGames(this.home.sort);
  }

  previousPage(){
    if(this.httpService.pageNumber == 1){
      return;
    }
    this.httpService.pageNumber -= 1;
    this.currentPage = this.httpService.pageNumber;
    this.home.searchGames(this.home.sort);
  }
}
