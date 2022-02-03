import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotTransactionComponent } from './slot-transaction.component';

describe('SlotTransactionComponent', () => {
  let component: SlotTransactionComponent;
  let fixture: ComponentFixture<SlotTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
