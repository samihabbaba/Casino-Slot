import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexCustomerComponent } from './complex-customer.component';

describe('ComplexCustomerComponent', () => {
  let component: ComplexCustomerComponent;
  let fixture: ComponentFixture<ComplexCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
