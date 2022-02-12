import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCustomerComponent } from './live-customer.component';

describe('LiveCustomerComponent', () => {
  let component: LiveCustomerComponent;
  let fixture: ComponentFixture<LiveCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
