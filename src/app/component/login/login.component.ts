import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Users} from '../../model/users';
import {UserLogin} from '../../model/user-login';
import {UsersService} from '../../service/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userLoginFormData: FormData;
  message = 'Valid';

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.userLoginFormData = new FormData();
  }

  onSubmitLogin(): void {
    const userLogin: UserLogin = this.loginForm.value;
    this.usersService.login(userLogin).subscribe(result => {
      localStorage.removeItem('token');
      localStorage.setItem('token', result.token);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(result));
      this.router.navigateByUrl('/');
    }, error => this.message = 'Wrong username or password!');
  }
}
