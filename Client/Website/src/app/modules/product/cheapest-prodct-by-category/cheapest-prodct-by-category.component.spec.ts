import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheapestProdctByCategoryComponent } from './cheapest-prodct-by-category.component';

describe('CheapestProdctByCategoryComponent', () => {
  let component: CheapestProdctByCategoryComponent;
  let fixture: ComponentFixture<CheapestProdctByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheapestProdctByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheapestProdctByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
