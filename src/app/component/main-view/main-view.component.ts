import { Component, OnInit } from '@angular/core';
import {Iplaylist} from '../../playlists/create-playlist/playlist';
import {PlaylistService} from '../../service/playlists/playlist.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {


  constructor(private playlistService: PlaylistService) { }

  playListTopDate: Iplaylist[] = [];

  ngOnInit(): void {
    this.playlistService.getTopDate().subscribe((result) => {
      this.playListTopDate = result;
      console.log(result);
    },error => {
      console.log(error);
    });
  }

}
