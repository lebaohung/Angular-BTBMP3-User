import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MainViewComponent} from './component/main-view/main-view.component';
import {RegistrationComponent} from './component/registration/registration.component';
import {LoginComponent} from './component/login/login.component';
import { NewSongComponent } from './component/new-song/new-song.component';
import {PlaylistComponent} from './playlists/playlist/playlist.component';
import {DashboardAdminComponent} from './component/dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newSong', component: NewSongComponent},
  { path: 'playlist', component: PlaylistComponent},
  { path: 'dashboard', component: DashboardAdminComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
