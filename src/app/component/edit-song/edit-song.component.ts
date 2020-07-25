import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongsService} from '../../service/song/songs.service';
import {SingerService} from '../../service/singer/singer.service';
import {Singer} from '../../model/singer';
import {Category} from '../../model/category';
import {FileUpload} from '../../model/file-upload';
import {CategoryService} from '../../service/category/category.service';
import {UploadFileService} from '../../service/upload-file/upload-file.service';
import {Users} from '../../model/users';
import {forEachToken} from 'tslint';
import {of} from 'rxjs';

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
  user: Users = {
    username: '',
    email: '',
    password: '',
    roles: {
      id: 0,
      name: ''
    }
  };
  selectedCategory: Category = {
    id: 0,
    name: ''
  };
  isShowSuccess = false;
  message: string;
  imageFile: any;
  selectedSingerId: string;
  selectedImage: FileList;
  currentImageUpload: FileUpload;
  percentage: number;
  selectingSinger: Singer;
  songId: number;
  url: string | ArrayBuffer = '';
  editSongForm: FormGroup;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private songsService: SongsService,
              private singerService: SingerService,
              private categoryService: CategoryService,
              private uploadFileService: UploadFileService) {
  }

  ngOnInit(): void {
    this.editSongForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(6)]],
      category: ['', [Validators.required]],
      songImage: [''],
      user: [''],
      likes: [''],
      views: [''],
      creatDate: [''],
      status: [''],
      description: [''],
      songLink: [''],
      songAuthor: ['', [Validators.required]]
    });
    // this.activatedRoute.params.subscribe( params => {
    //   this.songId = params.id;
    this.songsService.getSongById(29).subscribe(result => {
      this.editSongForm.setValue(result);
      this.url = this.editSongForm.get('songImage').value;
      this.selectedCategory = this.editSongForm.get('category').value;
      this.categoryService.getAllCategory().subscribe(value => {
        this.categoryList = value;
        for (let i = 0; i < this.categoryList.length; i++) {
          if (this.selectedCategory.id === this.categoryList[i].id) {
            this.categoryList.splice(i, 1);
            break;
          }
        }
      });
    });
    // });
    this.songsService.getSingerOfThisSong(29).subscribe(value => {
      this.selectingSinger = value;
      console.log(this.selectingSinger);
      this.singerService.getAllSinger().subscribe(result => {
        this.singerList = result;
        for (let i = 0; i < this.singerList.length; i++) {
          if (this.selectingSinger.id === this.singerList[i].id) {
            this.singerList.splice(i, 1);
            break;
          }
        }
      });
    });
  }

  displayImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
      console.log(this.url);
    }
    this.selectedImage = event.target.files;
  }

  upload(): void {
    this.imageFile = this.selectedImage.item(0);
    this.selectedImage = undefined;
    this.currentImageUpload = new FileUpload(this.imageFile);
    this.uploadFileService.pushFileToStorage(this.currentImageUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

  /*changeCategory(value): void {
    this.categoryService.getCategoryById(value).subscribe(result => {this.selectedCategory = result; console.log(this.selectedCategory); });
  }

  changeSingerId(value): void {
    this.selectedSingerId = value;
  }*/

  onSubmit(): void {
  }
}

