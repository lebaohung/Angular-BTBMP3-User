import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Users} from '../../model/users';
import {UsersService} from '../../service/users.service';

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
  userFormData: FormData;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      idUsers: ['', [Validators.required]],
      username : ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pw: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['']
      }, {validators: comparePassword}),
      fullname: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
    });
    this.userFormData = new FormData();
  }

  onSubmitRegister(): void{
    const user: Users = this.registrationForm.value;
    this.userFormData.append('idUsers', '1');
    this.userFormData.append('username', user.username);
    this.userFormData.append('email', user.email);
    this.userFormData.append('password', this.registrationForm.getRawValue().pw.password);
    this.userFormData.append('confirmpassword', this.registrationForm.getRawValue().pw.confirmpassword);
    this.userFormData.append('fullname', user.fullname);
    this.userFormData.append('phonenumber', user.phonenumber);
    this.usersService.registration(this.userFormData).subscribe(() => alert('OK'));
  }

  onChangeAvatar(event): void {
    this.userFormData.append('avatar', event.target.files[0]);
  }
}
