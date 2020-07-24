import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongsService} from '../../service/song/songs.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
  isShowSuccess = false;
  message: string;
  songId: number;
  editSongForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    category_id: ['', [Validators.required]],
    song_image: [''],
    id: [''],
    user_id: [''],
    likes: [''],
    views: [''],
    creat_date: [''],
    status: [''],
    description: [''],
    song_link: [''],
    song_author: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private songsService: SongsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.songId = params.id;
      this.songsService.getSongById(this.songId).subscribe( result => {
        this.editSongForm.setValue(result);
      });
    });
  }

  onSubmit(): void {
  }
}

