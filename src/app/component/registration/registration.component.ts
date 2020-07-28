import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../service/users.service';
import {HttpErrorResponse} from '@angular/common/http';

function comparePassword(c: AbstractControl): any {
  const v = c.value;
  return (v.password === v.confirmpassword) ? null : {passwordnotmatch: true};
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  userJson: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  });

  messageRespond: string;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username : ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pw: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['']
      }, {validators: comparePassword}),
    });
  }

  onSubmitRegister(): void{
    this.userJson.value.username = this.registrationForm.value.username;
    this.userJson.value.password = this.registrationForm.getRawValue().pw.password;
    this.userJson.value.email = this.registrationForm.value.email;
    this.usersService.registration(this.userJson.value).subscribe(
      (result) => {
        alert('OK');
        console.log(result);
      },
      (error: HttpErrorResponse) => {
        this.messageRespond = error.error.message;
      }
      ) ;
  }

}
