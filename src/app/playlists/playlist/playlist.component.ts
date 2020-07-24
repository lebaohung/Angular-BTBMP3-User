import { Component, OnInit } from '@angular/core';
import {Iplaylist} from '../create-playlist/playlist';
import {PlaylistService} from '../../service/playlists/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private playlistService: PlaylistService) { }

  playListTopView: Iplaylist[] = [];
  playListTopLike: Iplaylist[] = [];

  ngOnInit(): void {
    this.playlistService.getTopView().subscribe((result) => {
      this.playListTopView = result;
      console.log(result);
    },error => {
      console.log(error);
    });

    this.playlistService.getTopLike().subscribe((result) => {
      this.playListTopLike = result;
      console.log(result);
    },error => {
      console.log(error);
    });
  }

}
