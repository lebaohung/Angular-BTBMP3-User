import { Component, OnInit } from '@angular/core';
import {SingerService} from '../../service/singer/singer.service';
import {Song} from '../../model/song';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-singer-song',
  templateUrl: './singer-song.component.html',
  styleUrls: ['./singer-song.component.css']
})
export class SingerSongComponent implements OnInit {

  songList: Song[] = [];

  constructor(private singerService: SingerService,
              private activatedRoute: ActivatedRoute) { }

  idSinger: number;

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(result => this.idSinger = result.id);
    this.singerService.playSong(this.idSinger).subscribe(value => this.songList = value);
    console.log(this.idSinger);
    console.log(this.songList.values());
  }

}
