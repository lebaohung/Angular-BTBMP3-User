import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlaylistComponent } from './my-playlist.component';

describe('MyPlaylistComponent', () => {
  let component: MyPlaylistComponent;
  let fixture: ComponentFixture<MyPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
