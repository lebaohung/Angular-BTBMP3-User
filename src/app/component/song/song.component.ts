import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SongsService} from '../../service/song/songs.service';
import {Song} from '../../model/song';
import {Singer} from '../../model/singer';
import {Category} from '../../model/category';
import {Users} from '../../model/users';
import {PlaylistService} from '../../service/playlists/playlist.service';
import {Iplaylist} from '../../playlists/create-playlist/playlist';
import {UserInterface} from '../../playlists/my-playlist/user-interface';
import {ICommentPlaylist} from '../../model/comment-playlist';
import {ICommentSong} from '../../model/comment-song';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ShowSinger} from '../../model/show-singer';
import {Track} from 'ngx-audio-player';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  title = 'testAngular';
  msaapDisplayTitle = true;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;

  msaapPlaylist: Track[] = [
    {
      title: '',
      link: ''
    }
  ];

  songId: number;
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

  user: UserInterface = {
    id: 0,
    username: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    status: true,
    birthday: new Date(),
    createDate: new Date(),
    roles: []
  };
  singer: ShowSinger = {
    id: 0,
    name: '',
    create_date: '',
    image: ''
  };
  playlistIDUser: Iplaylist[] = [];
  user1 = '';
  idplaylist: number;

  commentSong: ICommentSong[] = [];
  comment: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private songsService: SongsService,
              private playlistService: PlaylistService) {
  }

  ngOnInit(): void {
    this.onload();
    this.songsService.shouldRefresh.subscribe(value => this.onload());
  }

  onload(): void {
    this.songId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.songsService.getSongById(this.songId).subscribe(value => {
      this.song = value;
      this.msaapPlaylist[0].title = this.song.name;
      this.msaapPlaylist[0].link = this.song.songLink;
      console.log(this.msaapPlaylist);
    }, error => {
      console.log(error);
      this.song = null;
    });
    this.songsService.getSingerOfThisSong(this.songId).subscribe(value => {
      this.singer = value;
      console.log(this.singer);
    }, error => {
      console.log(error);
      this.singer = null;
    });

    this.user1 = localStorage.getItem('user');
    this.user = JSON.parse(this.user1);
    this.playlistService.getIdUser(this.user.id).subscribe(value => this.playlistIDUser = value
    );

    this.songsService.getConment(this.songId).subscribe(value => this.commentSong = value);

    this.comment = new FormGroup({
      id: new FormControl(''),
      content: new FormControl('', [Validators.minLength(2), Validators.required]),
      date: new FormControl(''),
      song: new FormControl(''),
      user: new FormControl(''),
    });
    this.songsService.getSongById(this.songId).subscribe(value => this.song = value);
    // console.log(this.song);
  }

  // lấy id playlist
  idPlaylist(id: number): void {
    this.idplaylist = id;
  }


  addsong(): void {
    // console.log(this.idplaylist);
    // console.log(this.song);
    this.playlistService.addSongInPlaylist(this.idplaylist, this.song).subscribe();
  }

  addCommenttSong(): void {
    this.comment.get('user').setValue(JSON.parse(localStorage.getItem('user')));
    this.comment.get('song').setValue(this.song);
    console.log(this.comment.value);
    this.songsService.addCommetntSong(this.comment.value).subscribe(value => this.songsService.shouldRefresh.next());
  }

}
