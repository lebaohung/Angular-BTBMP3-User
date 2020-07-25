import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongsService} from '../../service/song/songs.service';
import {SingerService} from '../../service/singer/singer.service';
import {Singer} from '../../model/singer';
import {Category} from '../../model/category';
import {FileUpload} from '../../model/file-upload';
import {CategoryService} from '../../service/category/category.service';

const FRONT_LINK = 'https://firebasestorage.googleapis.com/v0/b/project-module-5.appspot.com/o/uploads%2F';
const BACK_LINK = '?alt=media&token=fad94b03-0cbe-49a5-b06f-4c2284bc4bd8';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
  singerList: Singer[] = [];
  categoryList: Category[] = [];
  selectedCategory: Category = {
    id: 0,
    name: ''
  };
  isShowSuccess = false;
  message: string;
  file: any;
  imageFile: any;
  selectedSingerId: string;
  selectedFile: FileList;
  selectedImage: FileList;
  currentFileUpload: FileUpload;
  currentImageUpload: FileUpload;
  percentage: number;
  selectingSinger: Singer;
  songId: number;
  url: string | ArrayBuffer = '';

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private songsService: SongsService,
              private singerService: SingerService,
              private categoryService: CategoryService) { }

  editSongForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    category: ['', [Validators.required]],
    songImage: [''],
    user: [''],
    description: [''],
    songLink: [''],
    songAuthor: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.songId = params.id;
      this.singerService.getSingerById(1).subscribe(value => this.selectingSinger = value);
      this.songsService.getSongById(this.songId).subscribe( result => {
        this.editSongForm.setValue(result);
      });
    });
    this.singerService.getAllSinger().subscribe(value => this.singerList = value);
    this.categoryService.getAllCategory().subscribe(value => this.categoryList = value);
  }

  onSubmit(): void {
  }
}

