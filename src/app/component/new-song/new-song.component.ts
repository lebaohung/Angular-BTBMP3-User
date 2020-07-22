import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {
  createSongForm: FormGroup;
  url = '';

  constructor() { }

  ngOnInit(): void {
    this.createSongForm = new FormGroup({
      songName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      singer: ['', Validators.required],
      category: ['', Validators.required],
      uploadFile: ['', Validators.required]
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
