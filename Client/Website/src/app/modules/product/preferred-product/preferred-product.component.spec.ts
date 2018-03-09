import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredProductComponent } from './preferred-product.component';

describe('PreferredProductComponent', () => {
  let component: PreferredProductComponent;
  let fixture: ComponentFixture<PreferredProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
