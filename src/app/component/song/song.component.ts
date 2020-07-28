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

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
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
  singer: Singer = {
    id: 0,
    name: '',
    create_date: ''
  };
  playlistIDUser: Iplaylist[] = [];
  user1 = '';
  idplaylist: number;

  constructor(private activatedRoute: ActivatedRoute,
              private songsService: SongsService,
              private playlistService: PlaylistService) {
  }

  ngOnInit(): void {
    this.songId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.songsService.getSongById(this.songId).subscribe(value => {
      this.song = value;
      console.log(this.song.songLink);
    }, error => {
      console.log(error);
      this.song = null;
    });
    this.songsService.getSingerOfThisSong(this.songId).subscribe(value => {
      this.singer = value;
    }, error => {
      console.log(error);
      this.singer = null;
    });

    this.user1 = localStorage.getItem('user');
    this.user = JSON.parse(this.user1);
    this.playlistService.getIdUser(this.user.id).subscribe(value => this.playlistIDUser = value
    );


  }

  // lấy id playlist
  idPlaylist(id: number): void {
    this.idplaylist = id;

  }


  addsong(): void {
    console.log(this.idplaylist);
    console.log(this.song);
    this.playlistService.addSongInPlaylist(this.idplaylist, this.song).subscribe();
  }
}
