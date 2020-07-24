import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUpload} from '../../model/file-upload';
import {UploadFileService} from '../../service/upload-file/upload-file.service';
import {SongsService} from '../../service/song/songs.service';
import {PlaylistService} from '../../service/playlists/playlist.service';
import {Iplaylist} from './playlist';

const FRONT_LINK = 'https://firebasestorage.googleapis.com/v0/b/project-module-5.appspot.com/o/uploads%2F';
const BACK_LINK = '?alt=media&token=fad94b03-0cbe-49a5-b06f-4c2284bc4bd8';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {

  createPlaylist: FormGroup;

  imageFile: any;
  percentage: number;
  selectedImage: FileList;
  currentImageUpload: FileUpload;
  url: string | ArrayBuffer = '';
  successMessage: string;
  failMessage: string;

  constructor(private uploadFileService: UploadFileService,
              private playlistService: PlaylistService) {
  }


  ngOnInit(): void {
    this.createPlaylist = new FormGroup({
      namePlaylist: new FormControl('', [Validators.required]),
      uploadFile: new FormControl('', [Validators.required]),
    });
  }

  setDefaultValue(): void {
    this.createPlaylist.get('likes').setValue(0);
    this.createPlaylist.get('views').setValue(0);
    this.createPlaylist.get('creat_date').setValue(new Date());
    this.createPlaylist.get('song_image').setValue(FRONT_LINK + this.imageFile.name + BACK_LINK);
    this.createPlaylist.get('user_id').setValue(localStorage.getItem('Authorization'));
  }

  create(playlist){
    this.playlistService.create(playlist.value).subscribe(() => {
      this.successMessage = 'Create new Success';
    }, () => {
      this.failMessage = 'New creation failed';
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

  selectFile(event): void {
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

}
