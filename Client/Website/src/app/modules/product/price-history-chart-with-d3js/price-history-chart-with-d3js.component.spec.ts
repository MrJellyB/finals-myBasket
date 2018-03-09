import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceHistoryChartWithD3jsComponent } from './price-history-chart-with-d3js.component';

describe('PriceHistoryChartWithD3jsComponent', () => {
  let component: PriceHistoryChartWithD3jsComponent;
  let fixture: ComponentFixture<PriceHistoryChartWithD3jsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceHistoryChartWithD3jsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceHistoryChartWithD3jsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
