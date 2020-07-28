import {Component, Input, OnInit} from '@angular/core';
import {PlaylistService} from '../../service/playlists/playlist.service';
import {Song} from '../../model/song';
import {ActivatedRoute} from '@angular/router';
import {ICommentPlaylist} from '../../model/comment-playlist';
import {Users} from '../../model/users';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Iplaylist} from '../create-playlist/playlist';

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

  commentPlaylist: ICommentPlaylist[] = [];
  comment: FormGroup;
  playlist: Iplaylist;

  ngOnInit(): void {
    this.onload();
    this.playlistService.shouldRefresh.subscribe(value => this.onload());
  }

  onload(): void {
    this.playlistService.shouldRefresh.subscribe(value => {
      this.activatedRoute.params.subscribe(result => this.idPlayList = result.id);
      this.playlistService.playSong(this.idPlayList).subscribe(value1 => this.songList = value1);
    } );
    this.activatedRoute.params.subscribe(result => this.idPlayList = result.id);

    this.playlistService.playSong(this.idPlayList).subscribe(value => this.songList = value);

    this.playlistService.getConment(this.idPlayList).subscribe(value => this.commentPlaylist = value);

    this.comment = new FormGroup({
      id: new FormControl(''),
      content: new FormControl('', [Validators.required]),
      date: new FormControl(''),
      playlist: new FormControl(''),
      user: new FormControl(''),
    });

    this.playlistService.getById(this.idPlayList).subscribe(value => this.playlist = value);
  }

  delete(id: number): void {
    this.idPlaylistSong = id;
    console.log(this.idPlaylistSong);
  }

  deleteSong(): void {
    this.playlistService.deleteSongPlaylist(this.idPlaylistSong).subscribe(value => {this.playlistService.shouldRefresh.next();});
  }


  addCommentPlaylist(): void {
    this.comment.get('user').setValue(JSON.parse(localStorage.getItem('user')));
    this.comment.get('playlist').setValue(this.playlist);
    console.log(this.comment.value);
    this.playlistService.addComment(this.comment.value).subscribe(value => this.playlistService.shouldRefresh.next());
  }
}
