import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {FileUpload} from '../../model/file-upload';
import {SongsService} from '../../service/song/songs.service';
import {UploadFileService} from '../../service/upload-file/upload-file.service';
import {Song} from '../../model/song';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
  song: Song;
  selectedFile: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  createSongForm: FormGroup;
  url: string | ArrayBuffer = '';

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private songsService: SongsService,
              private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
    this.createSongForm = this.fb.group({
      songName: ['', [Validators.required, Validators.minLength(6)]],
      singer: ['', [Validators.required]],
      category: ['', [Validators.required]],
      uploadFile: ['', [Validators.required]],
      songImage: [''],
      songId: [''],
      userId: [''],
      likes: [''],
      views: [''],
      createDate: [''],
      status: [''],
      description: ['']
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
  }

  onSubmit(): void {
    /*const file = this.selectedFile.item(0);
    console.log(file.name);
    this.selectedFile = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadFileService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );*/
  }

  selectFile(event): void {
    this.selectedFile = event.target.files;
  }
  upload(): void {
    const file = this.selectedFile.item(0);
    console.log(file);
    this.selectedFile = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadFileService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }
}
