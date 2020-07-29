import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerSongComponent } from './singer-song.component';

describe('SingerSongComponent', () => {
  let component: SingerSongComponent;
  let fixture: ComponentFixture<SingerSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingerSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingerSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
