import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SongsService} from '../../service/song/songs.service';
import {UploadFileService} from '../../service/upload-file/upload-file.service';
import {SingerService} from '../../service/singer/singer.service';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
  createSingerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private songsService: SongsService,
              private uploadFileService: UploadFileService,
              private singerService: SingerService) { }

  ngOnInit(): void {
    this.onload();
  }

  onload(): void {
    this.createSingerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      image: ['']
    });
  }

}
