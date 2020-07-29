import { Component, OnInit } from '@angular/core';
import {Singer} from '../../model/singer';
import {Category} from '../../model/category';
import {Song} from '../../model/song';
import {Iplaylist} from '../../playlists/create-playlist/playlist';
import {SearchService} from '../../service/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchInput: string;
  constructor() { }

  ngOnInit(): void {
  }

  display(event): void {
    this.searchInput = event.target.value.toString();
    console.log(this.searchInput);
  }
}
