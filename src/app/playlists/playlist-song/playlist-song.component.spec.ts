import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSongComponent } from './playlist-song.component';

describe('PlaylistSongComponent', () => {
  let component: PlaylistSongComponent;
  let fixture: ComponentFixture<PlaylistSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
