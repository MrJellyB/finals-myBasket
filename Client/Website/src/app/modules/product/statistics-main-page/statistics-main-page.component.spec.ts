import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsMainPageComponent } from './statistics-main-page.component';

describe('StatisticsMainPageComponent', () => {
  let component: StatisticsMainPageComponent;
  let fixture: ComponentFixture<StatisticsMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
