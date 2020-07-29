import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MainViewComponent} from './component/main-view/main-view.component';
import {RegistrationComponent} from './component/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './interceptor/jwt.interceptor';
import {LoginComponent} from './component/login/login.component';
import { SongComponent } from './component/song/song.component';
import { NewSongComponent } from './component/new-song/new-song.component';
import {CKEditorModule} from 'ngx-ckeditor';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import { EditSongComponent } from './component/edit-song/edit-song.component';
import { PlaylistComponent } from './playlists/playlist/playlist.component';
import { CreatePlaylistComponent } from './playlists/create-playlist/create-playlist.component';
import { MyPlaylistComponent } from './playlists/my-playlist/my-playlist.component';
import {RouterModule} from '@angular/router';
import { DashboardAdminComponent } from './component/dashboard-admin/dashboard-admin.component';
import { LogoutComponent } from './component/logout/logout.component';
import {PlaylistSongComponent} from './playlists/playlist-song/playlist-song.component';
import { SongByUserComponent } from './component/song-by-user/song-by-user.component';
import { SingerComponent } from './component/singer/singer.component';
import { SearchComponent } from './component/search/search.component';
import { SearchResultComponent } from './component/search-result/search-result.component';
import { ShowSingerComponent } from './component/show-singer/show-singer.component';


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    RegistrationComponent,
    LoginComponent,
    SongComponent,
    NewSongComponent,
    EditSongComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    MyPlaylistComponent,
    DashboardAdminComponent,
    LogoutComponent,
    PlaylistSongComponent,
    SongByUserComponent,
    SingerComponent,
    SearchComponent,
    SearchResultComponent,
    ShowSingerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CKEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
