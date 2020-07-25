import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../service/playlists/playlist.service';
import {UserInterface} from './user-interface';
import {Iplaylist} from '../create-playlist/playlist';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css']
})
export class MyPlaylistComponent implements OnInit {

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
  playlistIDUser: Iplaylist[] = [];
  user1 = '';

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
   this.user1 = localStorage.getItem('user');
   this.user = JSON.parse(this.user1);
   this.playlistService.getIdUser(this.user.id).subscribe(value => { this.playlistIDUser = value;
                                                                     console.log(this.playlistIDUser);
    });

   this.playlistService.shouldRefresh.subscribe(value => {
     this.user1 = localStorage.getItem('user');
     this.user = JSON.parse(this.user1);
     this.playlistService.getIdUser(this.user.id).subscribe(value => { this.playlistIDUser = value;
                                                                       console.log(this.playlistIDUser);
     });
   });
  }

  deletePlaylist(id: number): void {
    this.playlistService.delete(id).subscribe(value => {this.playlistService.shouldRefresh.next();
                                                        alert('Xóa Thàng Công'); });

  }
}
