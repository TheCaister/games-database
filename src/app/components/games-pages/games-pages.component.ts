import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-games-pages',
  templateUrl: './games-pages.component.html',
  styleUrls: ['./games-pages.component.scss']
})
export class GamesPagesComponent implements OnInit {


  constructor(private httpService: HttpService, private home: HomeComponent) { }

  // Input from the parent home component to update the 2 instances of this games-pages component
  @Input() currentPage = this.httpService.pageNumber;

  @Output() switchPageEvent = new EventEmitter();

  ngOnInit(): void {
  }

  nextPage(){
    this.httpService.pageNumber += 1;
    this.updatePage();
  }

  previousPage(){
    if(this.httpService.pageNumber == 1){
      return;
    }
    this.httpService.pageNumber -= 1;
    this.updatePage();
  }

  // Updating the current page and search
  updatePage(){
    //this.currentPage = this.httpService.pageNumber;
    this.home.searchGames(this.home.sort);
    this.switchPageEvent.emit();
  }
}
