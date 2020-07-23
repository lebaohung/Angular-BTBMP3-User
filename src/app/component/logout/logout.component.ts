import {Component, OnInit} from '@angular/core';
import {UserLogin} from '../../model/user-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmitLogout(): void {
    localStorage.removeItem('access_token');
    alert('Logout Successfully!');
    this.router.navigateByUrl('/');
  }
}
