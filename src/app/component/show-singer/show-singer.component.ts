import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-singer',
  templateUrl: './show-singer.component.html',
  styleUrls: ['./show-singer.component.css']
})
export class ShowSingerComponent implements OnInit {

  array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  constructor() { }

  ngOnInit(): void {
  }

}
