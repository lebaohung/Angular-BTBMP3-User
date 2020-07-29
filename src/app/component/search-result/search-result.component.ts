import {Component, OnInit} from '@angular/core';
import {Singer} from '../../model/singer';
import {Song} from '../../model/song';
import {Iplaylist} from '../../playlists/create-playlist/playlist';
import {SearchService} from '../../service/search/search.service';
import {ActivatedRoute} from '@angular/router';
import {SingerAndSong} from '../../model/singerAndSong';
import {SongsService} from '../../service/song/songs.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  singerList: Singer[] = [];
  songList: Song[] = [];
  playlists: Iplaylist[] = [];
  showPlaylist = false;
  showSonglist = false;
  showSingerList = false;
  selectedSongId: number;
  selectedSinger: Singer = {
    id: 0,
    name: '',
    create_date: ''
  };
  singerAndSong: SingerAndSong[] = [];

  constructor(private searchService: SearchService,
              private activatedRoute: ActivatedRoute,
              private songsService: SongsService) {
  }

  ngOnInit(): void {
    this.loadPlaylist();
    this.loadSingerList();
    this.loadSongList();
  }

  loadSongList(): void {
    this.activatedRoute.params.subscribe(params => {
      this.searchService.getSingerByName(params.id).subscribe(value => {
        this.songList = value;
        if (this.songList.length > 0) {
          this.showSonglist = true;
          for (let i = 0; i < this.songList.length; i++) {
            this.selectedSongId = this.songList[i].id;
            this.songsService.getSingerOfThisSong(this.selectedSongId).subscribe(value1 => {
              this.selectedSinger = value1;
              this.singerAndSong.push(
                {
                  song: this.songList[i],
                  singer: this.selectedSinger
                });
            });
          }
        }
      });
    });
  }

  loadPlaylist(): void {
    this.activatedRoute.params.subscribe(params => {
      this.searchService.getPlaylistByName(params.id).subscribe(value => {
        this.playlists = value;
        if (this.playlists.length > 0) {
          this.showPlaylist = true;
        }
      });
    });
  }

  loadSingerList(): void {
    this.activatedRoute.params.subscribe(params => {
      this.searchService.getSingerByName(params.id).subscribe(value => {
        this.singerList = value;
        if (this.singerList.length > 0) {
          this.showSingerList = true;
        }
      });
    });
  }
}
