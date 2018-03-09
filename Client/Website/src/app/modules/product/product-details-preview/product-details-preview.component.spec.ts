import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsPreviewComponent } from './product-details-preview.component';

describe('ProductDetailsPreviewComponent', () => {
  let component: ProductDetailsPreviewComponent;
  let fixture: ComponentFixture<ProductDetailsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
