import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../service/playlists/playlist.service';
import {UserInterface} from './user-interface';
import {Iplaylist} from '../create-playlist/playlist';
import {Users} from '../../model/users';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUpload} from '../../model/file-upload';
import {UploadFileService} from '../../service/upload-file/upload-file.service';

const FRONT_LINK = 'https://firebasestorage.googleapis.com/v0/b/project-module-5.appspot.com/o/uploads%2F';
const BACK_LINK = '?alt=media&token=fad94b03-0cbe-49a5-b06f-4c2284bc4bd8';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css']
})



export class MyPlaylistComponent implements OnInit {
  imageStatus = false;
  user: UserInterface = {
    id: 0,
    username: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    status: true,
    birthday: new Date(),
    createDate: new Date(),
    roles: []
  };
  imageFile: any;
  mageFile: any;
  isShowSuccess = false;
  message: string;
  percentage: number;
  selectedImage: FileList;
  currentImageUpload: FileUpload;
  url: string | ArrayBuffer = '';
  failMessage: string;


  idPlaylist: number;
  playlistIDUser: Iplaylist[] = [];
  user1 = '';

  constructor(private playlistService: PlaylistService,
              private fb: FormBuilder,
              private uploadFileService: UploadFileService) { }

  playlistEdit: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    views: [''],
    likes: [''],
    image: ['', [Validators.required]],
    createDate: [''],
    user: [''],
  });




  ngOnInit(): void {
   this.user1 = localStorage.getItem('user');
   this.user = JSON.parse(this.user1);
   this.playlistService.getIdUser(this.user.id).subscribe(value =>  this.playlistIDUser = value
    );

   this.playlistService.shouldRefresh.subscribe(value => {
     this.user1 = localStorage.getItem('user');
     this.user = JSON.parse(this.user1);
     this.playlistService.getIdUser(this.user.id).subscribe(result =>  this.playlistIDUser = result );
   });
  }

  deletePlaylist(id: number): void {
    this.playlistService.delete(id).subscribe(value => {this.playlistService.shouldRefresh.next(); });
  }

  delete(id: number): void {
    this.idPlaylist = id;
  }

  editPlaylist(id: number): void {
    this.idPlaylist = id;
    this.playlistService.playlistByID(id).subscribe(value => { this.playlistEdit.setValue(value);
                                                               console.log(this.playlistEdit); });
  }

  edit(): void {
    if (this.imageStatus === true) {
      this.upload();
      this.setDefaultValue();
    }
    this.playlistService.update(this.playlistEdit.value).subscribe(value => {
      this.isShowSuccess = true;
      this.message = 'Playlist has been edit successfully!';
      this.playlistService.shouldRefresh.next();
    }, () => {
      this.failMessage = 'Failed to edit new playlist';
    });
  }

  setDefaultValue(): void {
    this.playlistEdit.get('image').setValue(FRONT_LINK + this.imageFile.name + BACK_LINK);
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
