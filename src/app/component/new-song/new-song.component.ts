import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {FileUpload} from '../../model/file-upload';
import {SongsService} from '../../service/song/songs.service';
import {UploadFileService} from '../../service/upload-file/upload-file.service';
import {Singer} from '../../model/singer';
import {Category} from '../../model/category';

const FRONT_LINK = 'https://firebasestorage.googleapis.com/v0/b/project-module-5.appspot.com/o/uploads%2F';
const BACK_LINK = '?alt=media&token=fad94b03-0cbe-49a5-b06f-4c2284bc4bd8';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
  singerList: Singer[] = [{
    id: 1,
    name: 'a',
    create_date: 'aaa'
  },
    {
      id: 2,
      name: 'b',
      create_date: 'bbb'
    }
  ];
  categoryList: Category[] = [];
  file: any;
  imageFile: any;
  selectedSingerId: any;
  selectedFile: FileList;
  selectedImage: FileList;
  currentFileUpload: FileUpload;
  currentImageUpload: FileUpload;
  percentage: number;
  createSongForm: FormGroup;
  url: string | ArrayBuffer = '';

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private songsService: SongsService,
              private uploadFileService: UploadFileService) {
  }

  ngOnInit(): void {
    this.createSongForm = this.fb.group({
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
  }

  setDefaultValue(): void {
    this.createSongForm.get('likes').setValue(0);
    this.createSongForm.get('views').setValue(0);
    this.createSongForm.get('creat_date').setValue(new Date());
    this.createSongForm.get('status').setValue(1);
    this.createSongForm.get('song_link').setValue(FRONT_LINK + this.file.name + BACK_LINK);
    this.createSongForm.get('song_image').setValue(FRONT_LINK + this.imageFile.name + BACK_LINK);
    this.createSongForm.get('user_id').setValue(localStorage.getItem('Authorization'));
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
}
