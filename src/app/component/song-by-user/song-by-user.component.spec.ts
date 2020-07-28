import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongByUserComponent } from './song-by-user.component';

describe('SongByUserComponent', () => {
  let component: SongByUserComponent;
  let fixture: ComponentFixture<SongByUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongByUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
