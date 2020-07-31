import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SongsService} from '../../service/song/songs.service';
import {UploadFileService} from '../../service/upload-file/upload-file.service';
import {SingerService} from '../../service/singer/singer.service';
import {FileUpload} from '../../model/file-upload';

const FRONT_LINK = 'https://firebasestorage.googleapis.com/v0/b/btbmp3.appspot.com/o/uploads%2F';
const BACK_LINK = '?alt=media&token=8931cbe0-eac5-4071-986d-b99e417ca6fc';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
  createSingerForm: FormGroup;
  selectedAvatar: FileList;
  avatarFile: any;
  currentAvatarUpload: FileUpload;
  percentage: number;
  avatar: string | ArrayBuffer = '';
  progressBarStatus = false;
  message: string;
  failMessage: string;

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

  setDefaultValue(): void {
    this.createSingerForm.get('image').setValue(FRONT_LINK + this.avatarFile.name + BACK_LINK);
  }

  displayAvatar(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.avatar = event.target.result;
      };
    }
    this.selectedAvatar = event.target.files;
  }

  uploadAvatar(): void {
    this.avatarFile = this.selectedAvatar.item(0);
    this.selectedAvatar = undefined;
    this.currentAvatarUpload = new FileUpload(this.avatarFile);
    this.uploadFileService.pushFileToStorage(this.currentAvatarUpload).subscribe(
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
  }

  create(): void {
    this.uploadAvatar();
    this.setDefaultValue();
    this.singerService.create(this.createSingerForm.value).subscribe( result => {
      this.songsService.shouldRefresh.next();
      setTimeout(() => {
        this.message = 'Song was created successfully!';
      }, 2500);
    }, error => {
        this.failMessage = 'Create Singer failed!';
      });
    console.log(this.createSingerForm.value);
  }
}
