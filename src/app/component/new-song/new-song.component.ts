import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {FileUpload} from '../../model/file-upload';
import {SongsService} from '../../service/song/songs.service';
import {UploadFileService} from '../../service/upload-file/upload-file.service';
import {Singer} from '../../model/singer';
import {Category} from '../../model/category';
import {SingerService} from '../../service/singer/singer.service';
import {CategoryService} from '../../service/category/category.service';
import {Users} from '../../model/users';
import {Role} from '../../model/role';

const FRONT_LINK = 'https://firebasestorage.googleapis.com/v0/b/project-module-5.appspot.com/o/uploads%2F';
const BACK_LINK = '?alt=media&token=fad94b03-0cbe-49a5-b06f-4c2284bc4bd8';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
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
  file: any;
  imageFile: any;
  selectedSingerId: string;
  selectedFile: FileList;
  selectedImage: FileList;
  currentFileUpload: FileUpload;
  currentImageUpload: FileUpload;
  percentage: number;
  createSongForm: FormGroup;
  url: string | ArrayBuffer = '';
  progressBarStatus = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private songsService: SongsService,
              private uploadFileService: UploadFileService,
              private singerService: SingerService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.onload();
    this.songsService.shouldRefresh.subscribe(value => this.onload());
  }

  onload(): void {
    this.createSongForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      category: ['', [Validators.required]],
      songImage: [''],
      user: [''],
      description: [''],
      songLink: [''],
      songAuthor: ['', [Validators.required]]
    });
    this.singerService.getAllSinger().subscribe(value => this.singerList = value);
    this.categoryService.getAllCategory().subscribe(value => this.categoryList = value);
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  setDefaultValue(): void {
    this.createSongForm.get('songLink').setValue(FRONT_LINK + this.file.name + BACK_LINK);
    this.createSongForm.get('songImage').setValue(FRONT_LINK + this.imageFile.name + BACK_LINK);
    this.createSongForm.get('user').setValue(this.user);
    this.createSongForm.get('category').setValue(this.selectedCategory);
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

  onSubmit(): void {
    this.upload();
    this.setDefaultValue();
    console.log(this.createSongForm.value);
    this.songsService.create(this.createSongForm.value, this.selectedSingerId).subscribe( result => {
      this.songsService.shouldRefresh.next();
    });
    setTimeout(() => {
      this.isShowSuccess = true;
      this.message = 'Song was created successfully!';
    }, 4000);
  }

  selectFile(event): void {
    this.selectedFile = event.target.files;
  }

  upload(): void {
    this.file = this.selectedFile.item(0);
    this.imageFile = this.selectedImage.item(0);
    this.selectedFile = undefined;
    this.selectedImage = undefined;
    this.currentFileUpload = new FileUpload(this.file);
    this.currentImageUpload = new FileUpload(this.imageFile);
    this.uploadFileService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        if (this.percentage !== 100) {
          this.progressBarStatus = true;
        } else {
          setTimeout(() => {
            this.progressBarStatus = false;
          }, 1000);
        }
      },
      error => {
        console.log(error);
      }
    );
    this.uploadFileService.pushFileToStorage(this.currentImageUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

  changeCategory(value): void {
    this.categoryService.getCategoryById(value).subscribe(result => {this.selectedCategory = result; console.log(this.selectedCategory); });
  }

  changeSingerId(value): void {
    this.selectedSingerId = value;
  }
}
