import { Component, OnInit } from '@angular/core';
import {Singer} from '../../model/singer';
import {SingerService} from '../../service/singer/singer.service';
import {ShowSinger} from '../../model/show-singer';

@Component({
  selector: 'app-show-singer',
  templateUrl: './show-singer.component.html',
  styleUrls: ['./show-singer.component.css']
})
export class ShowSingerComponent implements OnInit {

  singerList: ShowSinger[];
  constructor(private singerService: SingerService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.singerService.getAllSinger().subscribe(
      value => this.singerList = value,
      error => {
        alert('Cannot get data');
      }
    );
  }

}
