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
import { PlaylistComponent } from './playlists/playlist/playlist.component';
import { CreatePlaylistComponent } from './playlists/create-playlist/create-playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    RegistrationComponent,
    LoginComponent,
    SongComponent,
    NewSongComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
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
