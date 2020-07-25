import {Component, OnInit} from '@angular/core';
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
  isShowSuccess = false;
  message: string;
  percentage: number;
  selectedImage: FileList;
  currentImageUpload: FileUpload;
  url: string | ArrayBuffer = '';
  failMessage: string;

  constructor(private uploadFileService: UploadFileService,
              private playlistService: PlaylistService) {
  }


  ngOnInit(): void {
    this.createPlaylist = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      user: new FormControl(''),
    });
  }

  setDefaultValue(): void {
    console.log(this.createPlaylist.get('image'));
    this.createPlaylist.get('image').setValue(FRONT_LINK + this.imageFile.name + BACK_LINK);
    this.createPlaylist.get('user').setValue(localStorage.getItem('user'));
    console.log(this.createPlaylist.get('user'));
  }

  create(): void {
    this.upload();
    this.setDefaultValue();
    this.playlistService.create(this.createPlaylist.value).subscribe(result => {
      this.isShowSuccess = true;
      this.message = 'Playlist has been created successfully!';
      this.playlistService.shouldRefresh.next();
    }, () => {
      this.failMessage = 'Failed to create new playlist';
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
