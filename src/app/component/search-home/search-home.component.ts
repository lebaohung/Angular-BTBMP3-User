import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {
  searchInput: string;
  constructor() { }

  ngOnInit(): void {
  }

  display(event): void {
    this.searchInput = event.target.value.toString();
    console.log(this.searchInput);
  }
}
