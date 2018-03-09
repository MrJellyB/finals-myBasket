import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookApiComponent } from './facebook-api.component';

describe('FacebookApiComponent', () => {
  let component: FacebookApiComponent;
  let fixture: ComponentFixture<FacebookApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
