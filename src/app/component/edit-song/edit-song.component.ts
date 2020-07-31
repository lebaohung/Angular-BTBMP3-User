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

const FRONT_LINK = 'https://firebasestorage.googleapis.com/v0/b/btbmp3.appspot.com/o/uploads%2F';
const BACK_LINK = '?alt=media&token=8931cbe0-eac5-4071-986d-b99e417ca6fc';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
  imageStatus = false;
  singerStatus = false;
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
  selectedSingerId: number;
  selectedImage: FileList;
  currentImageUpload: FileUpload;
  percentage: number;
  selectingSinger: Singer = {
    id: 0,
    name: '',
    create_date: ''
  };
  songId: number;
  url: string | ArrayBuffer = '';
  editSongForm: FormGroup;
  progressBarStatus = false;

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
      category: [''],
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
    this.activatedRoute.params.subscribe(params => {
      this.songId = params.id;
      this.songsService.getSongById(this.songId).subscribe(result => {
        this.editSongForm.setValue(result);
        console.log(this.editSongForm);
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
    });
    this.songsService.getSingerOfThisSong(this.songId).subscribe(value => {
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
    this.imageStatus = true;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
      console.log(this.url);
    }
    this.selectedImage = event.target.files;
    this.isShowSuccess = false;
  }

  upload(): void {
    this.imageFile = this.selectedImage.item(0);
    this.selectedImage = undefined;
    this.currentImageUpload = new FileUpload(this.imageFile);
    this.uploadFileService.pushFileToStorage(this.currentImageUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        if (this.percentage !== 100) {
          this.progressBarStatus = true;
        } else {
          setTimeout(() => {
            this.progressBarStatus = false;
          }, 2000);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  setDefaultValue(): void {
    this.editSongForm.get('songImage').setValue(FRONT_LINK + this.imageFile.name + BACK_LINK);
  }

  changeCategory(value): void {
    this.categoryService.getCategoryById(value).subscribe(result => {
      this.selectedCategory = result;
      console.log(this.selectedCategory);
      this.isShowSuccess = false;
    });
  }

  changeSingerId(value): void {
    this.singerStatus = true;
    this.selectedSingerId = value;
    this.isShowSuccess = false;
    console.log(this.selectedSingerId);
  }

  onSubmit(): void {
    if (this.imageStatus === true) {
      this.upload();
      this.setDefaultValue();
      this.imageStatus = false;
    }
    if (this.singerStatus === false) {
      this.selectedSingerId = this.selectingSinger.id;
    }
    this.songsService.update(this.editSongForm.value, this.selectedSingerId).subscribe(result => {
      this.songsService.shouldRefresh.next();
    });
    setTimeout(() => {
      this.isShowSuccess = true;
      this.message = 'Song was updated successfully!';
    }, 2000);
  }

  turnSuccessOff(): void {
    this.isShowSuccess = false;
  }
}

