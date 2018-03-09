import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartProuctPriceComponent } from './bar-chart-prouct-price.component';

describe('BarChartProuctPriceComponent', () => {
  let component: BarChartProuctPriceComponent;
  let fixture: ComponentFixture<BarChartProuctPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartProuctPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartProuctPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
