import {Component, Input, OnInit} from '@angular/core';
import {PlaylistService} from '../../service/playlists/playlist.service';
import {Song} from '../../model/song';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-playlist-song',
  templateUrl: './playlist-song.component.html',
  styleUrls: ['./playlist-song.component.css']
})
export class PlaylistSongComponent implements OnInit {
  songList: Song[] = [];
  idPlaylistSong: number;

  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute) {
  }

  idPlayList: number;

  ngOnInit(): void {
    this.playlistService.shouldRefresh.subscribe(value => {
      this.activatedRoute.params.subscribe(result => this.idPlayList = result.id);
      this.playlistService.playSong(this.idPlayList).subscribe(value1 => this.songList = value1);
    } );
    this.activatedRoute.params.subscribe(result => this.idPlayList = result.id);
    this.playlistService.playSong(this.idPlayList).subscribe(value => this.songList = value);

  }

  delete(id: number): void {
    this.idPlaylistSong = id;
    console.log(this.idPlaylistSong);
  }

  deleteSong(): void {
    this.playlistService.deleteSongPlaylist(this.idPlaylistSong).subscribe(value => {this.playlistService.shouldRefresh.next(); });
  }
}
