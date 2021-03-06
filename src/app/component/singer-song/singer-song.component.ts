import { Component, OnInit } from '@angular/core';
import {SingerService} from '../../service/singer/singer.service';
import {Song} from '../../model/song';
import {ActivatedRoute} from '@angular/router';
import {Track} from 'ngx-audio-player';
import {ShowSinger} from '../../model/show-singer';

@Component({
  selector: 'app-singer-song',
  templateUrl: './singer-song.component.html',
  styleUrls: ['./singer-song.component.css']
})
export class SingerSongComponent implements OnInit {

  songList: Song[] = [];
  title = 'Playlist';
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [10];
  msaapDisplayVolumeControls = true;
  msaapPlaylist: Track[] = [
    {
      title: '',
      link: ''
    }
  ];

  song: Song = {
    id: 0,
    name: '',
    category: {
      id: 0,
      name: ''
    },
    user: {
      username: '',
      email: '',
      password: '',
      roles: {
        id: 0,
        name: ''
      }
    },
    likes: 0,
    views: 0,
    creatDate: '',
    songImage: '',
    status: 0,
    description: '',
    songLink: '',
    songAuthor: ''
  };
  singers: ShowSinger[];
  singer: ShowSinger = {
    id: 0,
    name: '',
    create_date: '',
    image: ''
  };


  constructor(private singerService: SingerService,
              private activatedRoute: ActivatedRoute) { }

  idSinger: number;

  ngOnInit(): void {
    this.onload();
    this.singerService.shouldRefresh.subscribe(value => this.onload());
  }

  onload(): void {
    this.activatedRoute.params.subscribe(result => this.idSinger = result.id);
    this.singerService.getSingerById(this.idSinger).subscribe(value => this.singer = value);
    this.singerService.playSong(this.idSinger).subscribe(value => {
      this.songList = value;
      this.msaapPlaylist[0].title = this.songList[0].name;
      this.msaapPlaylist[0].link = this.songList[0].songLink;
      for (let i = 1; i < this.songList.length; i++) {
        const track: Track = {
          title: '',
          link: ''
        };
        track.title = this.songList[i].name;
        track.link = this.songList[i].songLink;
        this.msaapPlaylist.push(track);
      }
      console.log(this.msaapPlaylist);
    });
    this.singerService.getAllSinger().subscribe(result => this.singers = result);
    // console.log(this.idSinger);
    // console.log(this.songList.values());
  }

  refresh(): void {
    this.singerService.shouldRefresh.next();
  }
}
