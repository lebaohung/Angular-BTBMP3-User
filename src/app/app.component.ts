import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenStorageService} from './service/tokenStorage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ // chua implement DoCheck
  title = 'Angular-BTBMP3';
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  userId: number;
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }
  ngOnInit(): void {
    this.showContext();
  }
  ngDoCheck(): void {
    this.showContext();
  }
  showContext(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.fullName;
    }
  }
  logOut(): void {
    window.localStorage.clear();
  }
}
