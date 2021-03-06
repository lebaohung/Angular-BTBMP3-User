import {Component, OnInit} from '@angular/core';
import {SongsService} from '../../service/song/songs.service';
import {Song} from '../../model/song';
import {Singer} from '../../model/singer';
import {SingerAndSong} from '../../model/singerAndSong';
import {Iplaylist} from '../../playlists/create-playlist/playlist';
import {PlaylistService} from '../../service/playlists/playlist.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {


  constructor(private songsService: SongsService,
              private playlistService: PlaylistService) {
  }

  playListTopView: Iplaylist[] = [];
  playListTopDate: Iplaylist[] = [];
  playListTopLike: Iplaylist[] = [];
  songsTopView: Song[] = [];
  songsTopDate: Song[] = [];
  songsTopLike: Song[] = [];
  selectedSongTopViewId = 0;
  selectedSingerTopView: Singer = {
    id: 0,
    name: '',
    create_date: ''
  };
  selectedSongTopDateId = 0;
  selectedSingerTopDate: Singer = {
    id: 0,
    name: '',
    create_date: ''
  };
  selectedSongTopLikedId = 0;
  selectedSingerTopLiked: Singer = {
    id: 0,
    name: '',
    create_date: ''
  };
  singerAndSongTopDate: SingerAndSong[] = [];
  singerAndSongTopView: SingerAndSong[] = [];
  singerAndSongTopLiked: SingerAndSong[] = [];

  ngOnInit(): void {
    this.songsService.getTopDate().subscribe((result) => {
      this.songsTopDate = result;
      for (let i = 0; i < this.songsTopDate.length; i++) {
        this.selectedSongTopDateId = this.songsTopDate[i].id;
        this.songsService.getSingerOfThisSong(this.selectedSongTopDateId).subscribe(value => {
          this.selectedSingerTopDate = value;
          console.log(this.selectedSingerTopDate);
          this.singerAndSongTopDate.push(
            {
              song: this.songsTopDate[i],
              singer: this.selectedSingerTopDate
            });
        });
      }
    }, error => {
      console.log(error);
    });

    this.songsService.getTopView().subscribe((result) => {
      this.songsTopView = result;
      for (let i = 0; i < this.songsTopView.length; i++) {
        this.selectedSongTopViewId = this.songsTopView[i].id;
        this.songsService.getSingerOfThisSong(this.selectedSongTopViewId).subscribe(value => {
          this.selectedSingerTopView = value;
          this.singerAndSongTopView.push(
            {
              song: this.songsTopView[i],
              singer: this.selectedSingerTopView
            });
        });
      }
    }, error => {
      console.log(error);
    });

    this.songsService.getTopLiked().subscribe((result) => {
      this.songsTopLike = result;
      for (let i = 0; i < this.songsTopLike.length; i++) {
        this.selectedSongTopLikedId = this.songsTopLike[i].id;
        this.songsService.getSingerOfThisSong(this.selectedSongTopLikedId).subscribe(value => {
          this.selectedSingerTopLiked = value;
          this.singerAndSongTopLiked.push(
            {
              song: this.songsTopLike[i],
              singer: this.selectedSingerTopLiked
            });
        });
      }
    }, error => {
      console.log(error);
    });

    this.playlistService.getTopDate().subscribe((result) => {
      this.playListTopDate = result;
      console.log(result);
    }, error => {
      console.log(error);
    });

    this.playlistService.getTopView().subscribe((result) => {
      this.playListTopView = result;
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

}
