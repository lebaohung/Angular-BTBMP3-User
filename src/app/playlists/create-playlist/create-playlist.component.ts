import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {
  createPlaylist: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createPlaylist = new  FormGroup({
      namePlaylist: new FormControl('', [Validators.required])
    });
  }

}
