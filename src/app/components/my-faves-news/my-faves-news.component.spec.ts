import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavesNewsComponent } from './my-faves-news.component';

describe('MyFavesNewsComponent', () => {
  let component: MyFavesNewsComponent;
  let fixture: ComponentFixture<MyFavesNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFavesNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavesNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
