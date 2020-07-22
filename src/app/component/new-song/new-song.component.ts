import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
  createSongForm: FormGroup;
  url: string | ArrayBuffer = '';

  constructor(private fb: FormBuilder) { }

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
}
