import {Component,  OnInit} from '@angular/core';
import {PlaylistService} from '../../service/playlists/playlist.service';
import {Song} from '../../model/song';
import {ActivatedRoute} from '@angular/router';
import {ICommentPlaylist} from '../../model/comment-playlist';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Iplaylist} from '../create-playlist/playlist';
import {Track} from 'ngx-audio-player';
import {ShowSinger} from '../../model/show-singer';
import {Users} from '../../model/users';

@Component({
  selector: 'app-playlist-song',
  templateUrl: './playlist-song.component.html',
  styleUrls: ['./playlist-song.component.css']
})
export class PlaylistSongComponent implements OnInit {
  songList: Song[] = [];
  IDPlaylistSong: number;
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

  singer: ShowSinger = {
    id: 0,
    name: '',
    create_date: '',
    image: ''
  };

  idPlayList: number;

  commentPlaylist: ICommentPlaylist[] = [];
  comment: FormGroup;
  playlist: Iplaylist;
  playlistTopDate: Iplaylist[];

  user: Users = {
    username: '',
    email: '',
    password: '',
    roles: {
      id: 0,
      name: ''
    }
  };
  showAction = false;

  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.onload();
    this.playlistService.shouldRefresh.subscribe(value => this.onload());
  }

  onload(): void {

    this.activatedRoute.params.subscribe(result => this.idPlayList = result.id);

    this.playlistService.playSong(this.idPlayList).subscribe(value => {
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
    });

    this.playlistService.getConment(this.idPlayList).subscribe(value => this.commentPlaylist = value);

    this.comment = new FormGroup({
      id: new FormControl(''),
      content: new FormControl('', [Validators.required, Validators.minLength(1)]),
      date: new FormControl(''),
      playlist: new FormControl(''),
      user: new FormControl(''),
    });

    this.playlistService.getById(this.idPlayList).subscribe(value => {
      this.playlist = value;
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user.username === this.playlist.user.username) {
        this.showAction = true;
      }
    });

    this.playlistService.getTopDate().subscribe((result) => {
      this.playlistTopDate = result;
    }, error => {
      console.log(error);
    });
  }

  delete(id: number): void {
    this.IDPlaylistSong = id;
    console.log(this.IDPlaylistSong);
  }

  deleteSong(): void {
    this.playlistService.deleteSongPlaylist(this.idPlayList, this.IDPlaylistSong).subscribe(value => {
      this.playlistService.shouldRefresh.next(); });
  }


  addCommentPlaylist(): void {
    this.comment.get('user').setValue(JSON.parse(localStorage.getItem('user')));
    this.comment.get('playlist').setValue(this.playlist);
    console.log(this.comment.value);
    this.playlistService.addComment(this.comment.value).subscribe(value => this.playlistService.shouldRefresh.next());
  }

  refresh(): void {
    this.playlistService.shouldRefresh.next();
  }
}
