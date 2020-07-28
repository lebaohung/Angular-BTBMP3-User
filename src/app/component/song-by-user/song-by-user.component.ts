import {Component, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {SongsService} from '../../service/song/songs.service';
import {UserInterface} from '../../playlists/my-playlist/user-interface';
import {Singer} from '../../model/singer';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {SingerAndSong} from '../../model/singerAndSong';

@Component({
  selector: 'app-song-by-user',
  templateUrl: './song-by-user.component.html',
  styleUrls: ['./song-by-user.component.css']
})
export class SongByUserComponent implements OnInit {
  songs: Song[] = [];
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
  selectedSongId: number;
  selectedSinger: Singer = {
    id: 0,
    name: '',
    create_date: ''
  };
  singerAndSong: SingerAndSong[] = [];

  constructor(private songsService: SongsService) {
  }

  ngOnInit(): void {
    this.onload();
    this.songsService.shouldRefresh.subscribe(value => {
      this.singerAndSong = [];
      this.onload();
    });
  }

  onload(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.songsService.getSongByUser(this.user.id).subscribe(value => {
        this.songs = value;
        for (let i = 0; i < this.songs.length; i++) {
          this.selectedSongId = this.songs[i].id;
          this.songsService.getSingerOfThisSong(this.selectedSongId).subscribe(result => {
            this.selectedSinger = result;
            this.singerAndSong.push(
              {
                song: this.songs[i],
                singer: this.selectedSinger
              });
          });
        }
      }
      , error => {
        console.log(error);
        this.songs = null;
      });
  }

  deleteSong(id: number): void {
    const verify = confirm('Bạn có chắc chắn muốn xóa?');
    if (verify) {
      this.songsService.deleteSong(id).subscribe(() =>
        this.songsService.shouldRefresh.next());
    }
  }
}
